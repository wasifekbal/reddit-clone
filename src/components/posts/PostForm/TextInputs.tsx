import { Button, Flex, Input, Stack, Textarea } from "@chakra-ui/react";
import { ChangeEvent } from "react";

type Props = {
    textInputs: {
        title: string;
        body: string;
    };
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleCreatePost: () => void;
    loading: boolean;
};

export default function TextInputs({
    textInputs,
    onChange,
    handleCreatePost,
    loading,
}: Props) {
    return (
        <Stack spacing={3} width="100%">
            <Input
                name="title"
                fontSize="sm"
                borderRight={4}
                placeholder="Title"
                _placeholder={{ color: "gray.500" }}
                _focus={{
                    outline: "none",
                    bg: "white",
                    border: "1px solid",
                    borderColor: "black",
                }}
                border="1px solid"
                borderColor="gray.200"
                value={textInputs.title}
                onChange={onChange}
            />
            <Textarea
                name="body"
                fontSize="sm"
                borderRight={4}
                placeholder="Text (optional)"
                _placeholder={{ color: "gray.500" }}
                _focus={{
                    outline: "none",
                    bg: "white",
                    border: "1px solid",
                    borderColor: "black",
                }}
                border="1px solid"
                borderColor="gray.200"
                value={textInputs.body}
                onChange={onChange}
            />
            <Flex justify="flex-end">
                <Button
                    height="2rem"
                    px="1.9rem"
                    onClick={handleCreatePost}
                    isLoading={loading}
                    isDisabled={!textInputs.title}
                >
                    Post
                </Button>
            </Flex>
        </Stack>
    );
}
