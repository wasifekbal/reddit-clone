import { Post, postState } from "@/atoms/postsAtom";
import { firestore, storage } from "@/firebase/clientApp";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useRecoilState } from "recoil";

function getStoragePath(url: string): string {
    const partial_url = decodeURIComponent(url).split("?")[0].split("/");
    return partial_url.slice(partial_url.indexOf("o") + 1).join("/");
}

export default function usePosts() {
    const [postStateValue, setPostStateValue] = useRecoilState(postState);

    async function onVote() {}
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
