import { auth, firestore } from "@/firebase/clientApp";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Divider,
    Box,
    Text,
    InputGroup,
    Input,
    InputLeftElement,
    Stack,
    Checkbox,
    Flex,
    Icon,
} from "@chakra-ui/react";
import {
    doc,
    getDoc,
    serverTimestamp,
    setDoc,
} from "firebase/firestore";
import { ChangeEvent, FC, useState } from "react";
import { EyeFill, LockFill, PersonFill } from "react-bootstrap-icons";
import { useAuthState } from "react-firebase-hooks/auth";

type Props = {
    open: boolean;
    handleClose: () => void;
};

const CreateCommunityModal: FC<Props> = ({ open, handleClose }) => {
    const [user] = useAuthState(auth);
    const [communityName, setCommunityName] = useState("");
    const [charRem, setCharRem] = useState(21);
    const [communityType, setCommunityType] = useState("public");
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        if (text.length > 21) return;
        setCharRem(21 - text.length);
        setCommunityName(text);
    };

    const onCommunityTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCommunityType(e.target.name);
    };

    const createCommunity = async () => {
        setErr("");
        /* regex to match unwanted chars in community names. */
        const format = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
        if (format.test(communityName) || communityName.length < 3) {
            setErr(
                "Community names must be between 3-21 characters, and can only contain letters, number, or underscores."
            );
            return;
        }
        setLoading(true);
        try {
            /* Checks if the community name is already taken. */
            const docRef = doc(firestore, "communities", communityName);
            const communityDoc = await getDoc(docRef);
            if (communityDoc.exists()) {
                throw new Error(
                    `Sorry, r/${communityName} is already taken. Try another name.`
                );
            }
            await setDoc(docRef, {
                creatorId: user?.uid,
                createdAt: serverTimestamp(),
                numberOfMembers: 1,
                privacyType: communityType,
            });
        } catch (error: any) {
            console.log("createCommunity err", error);
            setErr(error.message);
        }
        setLoading(false);
    };

    return (
        <Modal isOpen={open} onClose={handleClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader
                    display="flex"
                    flexDir="column"
                    fontSize="1rem"
                    padding={3}
                >
                    Create a community
                </ModalHeader>
                <ModalCloseButton />
                <Box px={3}>
                    <Divider />
                    <ModalBody
                        display="flex"
                        flexDir="column"
                        padding="10px 0px"
                    >
                        <Text fontWeight={600} fontSize={15}>
                            Name
                        </Text>
                        <Text fontSize="11px" color="gray.500">
                            Community names including capitalization cannot be
                            changed.
                        </Text>
                        <InputGroup mt={6}>
                            <InputLeftElement
                                pointerEvents="none"
                                fontSize="lg"
                                color="gray.500"
                            >
                                r
                                <Text fontSize="1.5rem" fontWeight={300}>
                                    /
                                </Text>
                            </InputLeftElement>
                            <Input
                                type="text"
                                variant="unstyled"
                                height="2.4rem"
                                border="1px solid"
                                borderColor="gray.200"
                                paddingLeft="1.8rem"
                                _focus={{
                                    border: "2px solid",
                                    borderColor: "black",
                                }}
                                value={communityName}
                                onChange={handleChange}
                            />
                        </InputGroup>
                        <Text
                            fontSize="xs"
                            mt={2}
                            pl={1}
                            color={charRem !== 0 ? "gray.500" : "red.500"}
                        >
                            {charRem} Characters remaining
                        </Text>
                        <Text fontSize="xs" color="red.600" mt={2} pl={1}>
                            {err}
                        </Text>
                        <Box my={7}>
                            <Text fontWeight={600}>Community type</Text>
                            <Stack mt={2}>
                                <Checkbox
                                    name="public"
                                    isChecked={communityType === "public"}
                                    onChange={onCommunityTypeChange}
                                    variant="circular"
                                    size="lg"
                                >
                                    <Flex align="flex-end">
                                        <Icon
                                            as={PersonFill}
                                            fontSize={20}
                                            color="gray.500"
                                        />
                                        <Text
                                            fontSize="sm"
                                            fontWeight={600}
                                            ml={2}
                                            mr={1}
                                        >
                                            Public
                                        </Text>
                                        <Text fontSize="xs" color="gray.500">
                                            Anyone can view, post, and comment
                                            to this community
                                        </Text>
                                    </Flex>
                                </Checkbox>
                                <Checkbox
                                    name="restricted"
                                    isChecked={communityType === "restricted"}
                                    onChange={onCommunityTypeChange}
                                    variant="circular"
                                    size="lg"
                                >
                                    <Flex align="flex-end">
                                        <Icon
                                            as={EyeFill}
                                            fontSize={20}
                                            color="gray.500"
                                        />
                                        <Text
                                            fontSize="sm"
                                            fontWeight={600}
                                            ml={2}
                                            mr={1}
                                        >
                                            Restricted
                                        </Text>
                                        <Text fontSize="xs" color="gray.500">
                                            Anyone can view this community, but
                                            only approved users can post
                                        </Text>
                                    </Flex>
                                </Checkbox>
                                <Checkbox
                                    name="private"
                                    isChecked={communityType === "private"}
                                    onChange={onCommunityTypeChange}
                                    variant="circular"
                                    size="lg"
                                >
                                    <Flex align="flex-end">
                                        <Icon
                                            as={LockFill}
                                            fontSize={20}
                                            color="gray.500"
                                        />
                                        <Text
                                            fontSize="sm"
                                            fontWeight={600}
                                            ml={2}
                                            mr={1}
                                        >
                                            Private
                                        </Text>
                                        <Text fontSize="xs" color="gray.500">
                                            Only approved users can view and
                                            submit to this community
                                        </Text>
                                    </Flex>
                                </Checkbox>
                            </Stack>
                        </Box>
                        <Box my={3}>
                            <Text fontWeight={600}>Adult content</Text>
                            <Checkbox size="lg" isDisabled>
                                <Flex align="flex-end" fontSize="sm">
                                    <Text
                                        mr={2}
                                        border="1px solid"
                                        px={1}
                                        bg="red.500"
                                        color="white"
                                    >
                                        NSFW
                                    </Text>
                                    <Text>18+ year old community</Text>
                                </Flex>
                            </Checkbox>
                        </Box>
                    </ModalBody>
                </Box>
                <ModalFooter bg="gray.100" borderBottomRadius={4}>
                    <Button
                        variant="outline"
                        height={8}
                        mr={3}
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        height={8}
                        onClick={createCommunity}
                        isLoading={loading}
                    >
                        Create Community
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default CreateCommunityModal;
