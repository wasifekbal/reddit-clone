import { Post } from "@/atoms/postsAtom";
import { firestore, storage } from "@/firebase/clientApp";
import useSelectedFile from "@/hooks/useSelectFile";
import { Alert, AlertIcon, Flex, Icon } from "@chakra-ui/react";
import { User } from "firebase/auth";
import {
    addDoc,
    collection,
    serverTimestamp,
    Timestamp,
    updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import {
    BarChartLineFill,
    FileEarmarkTextFill,
    Image,
    Link45deg,
    Mic,
} from "react-bootstrap-icons";
import ImageUpload from "./ImageUpload";
import TabItem from "./TabItem";
import TextInputs from "./TextInputs";

type NewPostFormProps = {
    user: User;
};

type SingleTabItem = {
    id: number;
    title: string;
    icon: typeof Icon.arguments;
};

const formTabs: SingleTabItem[] = [
    {
        id: 1,
        title: "Post",
        icon: FileEarmarkTextFill,
    },
    {
        id: 2,
        title: "Images & Videos",
        icon: Image,
    },
    {
        id: 3,
        title: "Link",
        icon: Link45deg,
    },
    {
        id: 4,
        title: "Poll",
        icon: BarChartLineFill,
    },
    {
        id: 5,
        title: "Talk",
        icon: Mic,
    },
];

export default function NewPostForm({ user }: NewPostFormProps) {
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState(formTabs[0].id);
    const [textInputs, setTextInputs] = useState({
        title: "",
        body: "",
    });

    const {selectedFile, setSelectedFile, onSelectFile} = useSelectedFile();
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(false);
    async function handleCreatePost() {
        // create new post obj of type Post
        const { communityId } = router.query;
        const newPost: Post = {
            communityId: communityId as string,
            creatorId: user?.uid,
            creatorDisplayName: user.email!.split("@")[0],
            title: textInputs.title,
            body: textInputs.body,
            numberOfComments: 0,
            voteStatus: 0,
            createdAt: serverTimestamp() as Timestamp,
        };
        // store the post in db
        setLoading(true);
        try {
            const postDocRef = await addDoc(
                collection(firestore, "posts"),
                newPost
            );
            if (selectedFile) {
                const imageRef = ref(
                    storage,
                    `posts/${postDocRef.id}/${nanoid()}`
                );
                await uploadString(imageRef, selectedFile, "data_url");
                const downloadURL = await getDownloadURL(imageRef);

                await updateDoc(postDocRef, {
                    imageURL: downloadURL,
                });
            }
            router.back();
        } catch (error) {
            console.log("handleCreatePost error: ", error);
        }
        setLoading(false);
    }

    function onTextChange(
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const {
            target: { name, value },
        } = e;
        setTextInputs((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
    return (
        <Flex direction="column" bg="white" borderRadius={4} mt={2}>
            <Flex width="100%">
                {formTabs.map((item) => (
                    <TabItem
                        key={item.id}
                        item={item}
                        selected={item.id === selectedTab}
                        setSelectedTab={setSelectedTab}
                    />
                ))}
            </Flex>
            <Flex p={4}>
                {selectedTab === 1 && (
                    <TextInputs
                        textInputs={textInputs}
                        handleCreatePost={handleCreatePost}
                        onChange={onTextChange}
                        loading={loading}
                    />
                )}
                {selectedTab === 2 && (
                    <ImageUpload
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                        onSelectImage={onSelectFile}
                        setSelectedTab={setSelectedTab}
                    />
                )}
            </Flex>
            {err && (
                <Alert status="error">
                    <AlertIcon />
                    Error creating the post.
                </Alert>
            )}
        </Flex>
    );
}
