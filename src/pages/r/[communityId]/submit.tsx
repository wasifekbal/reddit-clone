import { communityState } from "@/atoms/communitiesAtom";
import PageContentLayout from "@/components/Layout/PageContentLayout";
import NewPostForm from "@/components/posts/PostForm/NewPostForm";
import { auth } from "@/firebase/clientApp";
import { Box, Text } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";

export default function CommunityPostSubmitPage() {
    const [user] = useAuthState(auth);
    const currentCommStateValue = useRecoilValue(communityState);
    return (
        <PageContentLayout>
            <>
                <Box p="1rem" borderBottom="1px solid" borderColor="white">
                    <Text>Create a post</Text>
                </Box>
                {user && <NewPostForm user={user} />}
            </>
            <></>
        </PageContentLayout>
    );
}
