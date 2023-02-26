import { postState } from "@/atoms/postsAtom";
import { useRecoilState } from "recoil";

export default function usePosts() {
    const [postStateValue, setPostStateValue] = useRecoilState(postState);
    
    async function onVote() {};
    function onSelectPost() {};
    async function onDeletePost() {};

    return {
        postStateValue,
        setPostStateValue,
        onVote,
        onSelectPost,
        onDeletePost,
    };
}
