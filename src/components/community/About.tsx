import { Community, communityState } from "@/atoms/communitiesAtom";
import {
    Box,
    Button,
    Divider,
    Flex,
    Icon,
    Image,
    Input,
    Spinner,
    Stack,
    Text,
} from "@chakra-ui/react";
import { InfoCircle, Reddit } from "react-bootstrap-icons";
import { CakeIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore, storage } from "@/firebase/clientApp";
import { useRef, useState } from "react";
import useSelectedFile from "@/hooks/useSelectFile";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { useSetRecoilState } from "recoil";

type AboutProps = {
    communityData: Community;
};

export default function About({ communityData }: AboutProps) {
    const [user] = useAuthState(auth);
    const { selectedFile, onSelectFile } = useSelectedFile();
    const fileRef = useRef<HTMLInputElement>(null);
    const [upImgLoading, setUpImgLoading] = useState(false);
    const setCommStateValue = useSetRecoilState(communityState);

    async function onUpdateImage() {
        if (!selectedFile) return;
        setUpImgLoading(true);
        try {
            const imageRef = ref(
                storage,
                `communities/${communityData.id}/logo`
            );
            await uploadString(imageRef, selectedFile, "data_url");
            const downloadUrl = await getDownloadURL(imageRef);
            await updateDoc(doc(firestore, "communities", communityData.id), {
                logoUrl: downloadUrl,
            });
            setCommStateValue((prev) => ({
                ...prev,
                currentComm: {
                    ...prev.currentComm,
                    logoUrl: downloadUrl,
                } as Community,
            }));
        } catch (error: any) {
            console.log("onUpdateImg error", error);
        }
        setUpImgLoading(false);
    }

    return (
        <Box position="sticky" top="0.875rem" width="full">
            <Flex
                justify="space-between"
                align="center"
                bg="blue.400"
                color="white"
                p={3}
                borderTopRadius="4px"
            >
                <Text fontSize="sm" fontWeight={600}>
                    About Community
                </Text>
                <Icon as={InfoCircle} />
            </Flex>
            <Flex direction="column" p={3} bg="white" borderBottomRadius="4px">
                <Stack>
                    <Flex width="full" p={2} fontSize="sm">
                        <Flex direction="column" grow={1}>
                            <Text>
                                {communityData.numberOfMembers.toLocaleString()}
                            </Text>
                            <Text>Members</Text>
                        </Flex>
                        <Flex direction="column" grow={1}>
                            <Text>69</Text>
                            <Text>Online</Text>
                        </Flex>
                    </Flex>
                    <Divider />
                    <Flex
                        align="center"
                        width="full"
                        p={1}
                        fontWeight={500}
                        fontSize="sm"
                    >
                        <Icon as={CakeIcon} fontSize="xl" mr={2} />
                        {communityData.createdAt && (
                            <Text>
                                Created{" "}
                                {moment(
                                    new Date(
                                        communityData.createdAt?.seconds * 1000
                                    )
                                ).format("MMM DD, YYYY")}
                            </Text>
                        )}
                    </Flex>
                    <Link href={`/r/${communityData.id}/submit`}>
                        <Button mt={2} height="30px" width="full">
                            Create Post
                        </Button>
                    </Link>
                    {user?.uid === communityData.creatorId && (
                        <>
                            <Divider />
                            <Stack spacing={1} fontSize="sm">
                                <Text fontWeight={600}>Admin</Text>
                                <Flex align="center" justify="space-between">
                                    <Text
                                        color="blue.500"
                                        cursor="pointer"
                                        _hover={{
                                            textDecoration: "underline",
                                        }}
                                        onClick={() => fileRef.current?.click()}
                                    >
                                        Change Image
                                    </Text>
                                    {communityData.logoUrl &&
                                        (selectedFile ? (
                                            <Image
                                                src={
                                                    selectedFile ||
                                                    communityData.logoUrl
                                                }
                                                alt="what"
                                                height="5rem"
                                            />
                                        ) : (
                                            <Icon
                                                as={Reddit}
                                                fontSize={40}
                                                color="blue.400"
                                                mr={2}
                                            />
                                        ))}
                                </Flex>
                                {selectedFile &&
                                    (upImgLoading ? (
                                        <Spinner />
                                    ) : (
                                        <Text
                                            cursor="pointer"
                                            onClick={onUpdateImage}
                                        >
                                            Save changes
                                        </Text>
                                    ))}
                                <Input
                                    id="uploadFile"
                                    type="file"
                                    accept="image/x-png,image/gif,image/jpeg"
                                    hidden
                                    ref={fileRef}
                                    onChange={onSelectFile}
                                />
                            </Stack>
                        </>
                    )}
                </Stack>
            </Flex>
        </Box>
    );
}
