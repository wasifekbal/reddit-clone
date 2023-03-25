import { Community } from "@/atoms/communitiesAtom";
import { Post } from "@/atoms/postsAtom";
import { auth, firestore } from "@/firebase/clientApp";
import usePosts from "@/hooks/usePosts";
import { Stack } from "@chakra-ui/react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import PostItem from "./PostItem";
import PostLoader from "./PostLoader";

type Props = {
    communityData: Community;
    /* userId?: string */
};

export default function Posts({ communityData }: Props) {
    const [loading, setLoading] = useState(false);
    const [user] = useAuthState(auth);
    const {
        postStateValue,
        setPostStateValue,
        onVote,
        onSelectPost,
        onDeletePost,
    } = usePosts();
    async function getPosts() {
        try {
            setLoading(true);
            const postQuery = query(
                collection(firestore, "posts"),
                where("communityId", "==", communityData.id),
                orderBy("createdAt", "desc")
            );
            const postDocs = await getDocs(postQuery);
            const posts = postDocs.docs.map((eachDoc) => ({
                id: eachDoc.id,
                ...eachDoc.data(),
            }));
            setPostStateValue((prev) => ({
                ...prev,
                posts: posts as Post[],
            }));
        } catch (error: any) {
            console.log("getpost error", error);
        }
        setLoading(false);
    }
    useEffect(() => {
        getPosts();
    }, []);

    if (loading) {
        return <PostLoader />;
    }

    return (
        <Stack>
            {postStateValue.posts.map((eachPost) => (
                <PostItem
                    key={eachPost.id}
                    post={eachPost}
                    userIsCreator={user?.uid === eachPost.creatorId}
                    userVoteValue={
                        postStateValue.postVotes.find(
                            (vote) => vote.postId === eachPost.id
                        )?.voteValue
                    }
                    onVote={onVote}
                    onSelectPost={onSelectPost}
                    onDeletePost={onDeletePost}
                />
            ))}
        </Stack>
    );
}
