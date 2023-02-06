import PageContentLayout from "@/components/Layout/PageContentLayout";
import NewPostForm from "@/components/posts/NewPostForm";
import { auth } from "@/firebase/clientApp";
import { Box, Text } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function CommunityPostSubmitPage() {
    const [user] = useAuthState(auth);
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
