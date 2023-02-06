import PageContentLayout from "@/components/Layout/PageContentLayout";
import NewPostForm from "@/components/posts/NewPostForm";
import { Box, Text } from "@chakra-ui/react";

export default function CommunityPostSubmitPage() {
    return (
        <PageContentLayout>
            <>
                <Box p="1rem" borderBottom="1px solid" borderColor="white">
                    <Text>Create a post</Text>
                </Box>
                <NewPostForm />
            </>
            <>
            </>
        </PageContentLayout>
    )
}
