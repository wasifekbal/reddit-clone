import { Post, postState, PostVote } from "@/atoms/postsAtom";
import { auth, firestore, storage } from "@/firebase/clientApp";
import { collection, deleteDoc, doc, writeBatch } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";

function getStoragePath(url: string): string {
    const partial_url = decodeURIComponent(url).split("?")[0].split("/");
    return partial_url.slice(partial_url.indexOf("o") + 1).join("/");
}

export default function usePosts() {
    const [postStateValue, setPostStateValue] = useRecoilState(postState);
    const [user] = useAuthState(auth);

    async function onVote(post: Post, vote: number, communityId: string) {
        /* if no user, open auth modal */

        try {
            const existingVote = postStateValue.postVotes.find(
                (vote) => vote.postId === post.id
            );
            const batch = writeBatch(firestore);
            const updatedPost = { ...post };
            let updatedPostVotes = [...postStateValue.postVotes];

            /* new vote */
            if (!existingVote) {
                /* creating a new postVotes doc */
                const postVoteRef = doc(
                    collection(firestore, "users", `${user?.uid}/postVotes`)
                );
                const newVote: PostVote = {
                    id: postVoteRef.id,
                    postId: post.id!,
                    communityId,
                    voteValue: vote,
                };
                /* setting data to the new doc */
                batch.set(postVoteRef, newVote);
                updatedPost.voteStatus += vote;
                updatedPostVotes = [...updatedPostVotes, newVote];
            } else {
                /* already exists a vote. */
                const postVoteRef = doc(
                    firestore,
                    "users",
                    `${user?.uid}/postVotes/${existingVote.id}`
                );
                /* when voting again in the same direction */
                if (existingVote.voteValue === vote) {
                    /* if voteStatus=1 and vote=1; then voteStatus - (1) */
                    /* if voteStatus=-1 and vote=-1; then voteStatus - (-1) = +1 */
                    updatedPost.voteStatus -= vote;
                    updatedPostVotes = updatedPostVotes.filter(
                        (vote) => vote.id !== existingVote.id
                    );
                    batch.delete(postVoteRef);
                    vote *= -1;
                } else {
                    /* vote is switching from -1 to +1 OR +1 to -1 */
                    updatedPost.voteStatus += 2 * vote;
                    const voteIdx = updatedPostVotes.findIndex(
                        (vote) => vote.id === existingVote.id
                    );
                    updatedPostVotes[voteIdx] = {
                        ...existingVote,
                        voteValue: vote,
                    };
                    batch.update(postVoteRef, {
                        voteValue: vote,
                    });
                }
            }
            /* update the post doc in firebase */
            const postRef = doc(firestore, "posts", post.id!);
            batch.update(postRef, {
                voteStatus: updatedPost.voteStatus,
            });
            await batch.commit();

            /* update the states with updated values */
            setPostStateValue((prev) => ({
                ...prev,
                posts: prev.posts.map((eachPost) =>
                    eachPost.id === post.id ? updatedPost : eachPost
                ),
                postVotes: updatedPostVotes,
            }));
        } catch (error: any) {
            console.log("onVote error: ", error);
        }
    }
    function onSelectPost() {}
    async function onDeletePost(post: Post): Promise<boolean> {
        try {
            if (post.imageURL) {
                const imgPath = getStoragePath(post.imageURL);
                const imgRef = ref(storage, imgPath);
                await deleteObject(imgRef);
            }
            const postDocRef = doc(firestore, "posts", post.id!);
            await deleteDoc(postDocRef);

            setPostStateValue((prev) => ({
                ...prev,
                posts: prev.posts.filter((item) => item.id !== post.id),
            }));
            return true;
        } catch (error: any) {
            return false;
        }
    }

    return {
        postStateValue,
        setPostStateValue,
        onVote,
        onSelectPost,
        onDeletePost,
    };
}
