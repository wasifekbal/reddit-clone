import { Button, Flex, Image } from "@chakra-ui/react";
import { ChangeEvent, useRef } from "react";

type Props = {
    selectedFile?: string;
    setSelectedFile: (value: string) => void;
    onSelectImage: (e: ChangeEvent<HTMLInputElement>) => void;
    setSelectedTab: (value: number) => void;
};

export default function ImageUpload({
    selectedFile,
    setSelectedFile,
    onSelectImage,
    setSelectedTab,
}: Props) {
    const fileRef = useRef<HTMLInputElement>(null);
    return (
        <Flex justify="center" align="center" width="100%" direction="column">
            {selectedFile ? (
                <>
                    <Image
                        src={selectedFile}
                        maxWidth="400px"
                        maxHeight="400px"
                        alt="Selected Image"
                    />
                    <Flex mt={4} gap={2}>
                        <Button height="28px" onClick={() => setSelectedTab(1)}>
                            Back to Post
                        </Button>
                        <Button
                            variant="outline"
                            height="28px"
                            onClick={() => setSelectedFile("")}
                        >
                            Remove
                        </Button>
                    </Flex>
                </>
            ) : (
                <Flex
                    justify="center"
                    align="center"
                    width="100%"
                    border="1px dotted"
                    borderColor="gray.200"
                    borderRadius={4}
                    p={20}
                >
                    <Button
                        variant="outline"
                        height="28px"
                        onClick={() => fileRef.current?.click()}
                    >
                        Upload
                    </Button>
                    <input
                        ref={fileRef}
                        type="file"
                        name="file"
                        hidden
                        onChange={onSelectImage}
                    />
                </Flex>
            )}
        </Flex>
    );
}
