import { Post } from "@/atoms/postsAtom";
import { DeleteOutlined } from "@ant-design/icons";
import { Flex, Icon, Image, Skeleton, Stack, Text } from "@chakra-ui/react";
import moment from "moment";
import { useState } from "react";
import {
    ArrowDownCircle,
    ArrowDownCircleFill,
    ArrowUpCircle,
    ArrowUpCircleFill,
    Bookmark,
    Chat,
    Share,
} from "react-bootstrap-icons";

type Props = {
    post: Post;
    userIsCreator: boolean;
    userVoteValue?: number;
    onVote: () => {};
    onDeletePost: () => {};
    onSelectPost: () => void;
};

export default function PostItem({
    post,
    userIsCreator,
    userVoteValue,
    onVote,
    onDeletePost,
    onSelectPost,
}: Props) {
    const [loadingImg, setLoadingImg] = useState(true);
    return (
        <Flex
            border="1px solid"
            bg="white"
            borderColor="gray.300"
            borderRadius={4}
            _hover={{
                borderColor: "gray.500",
            }}
            cursor="pointer"
            onClick={onSelectPost}
        >
            <Flex
                direction="column"
                align="center"
                bg="gray.100"
                p={3}
                width="40px"
                borderRadius={4}
            >
                <Icon
                    as={userVoteValue === 1 ? ArrowUpCircleFill : ArrowUpCircle}
                    color={userVoteValue === 1 ? "brand.100" : "gray.400"}
                    fontSize={22}
                    onClick={onVote}
                    cursor="pointer"
                />
                <Text my={1} fontSize="sm">{post.voteStatus}</Text>
                <Icon
                    as={
                        userVoteValue === 1
                            ? ArrowDownCircleFill
                            : ArrowDownCircle
                    }
                    color={userVoteValue === -1 ? "#4379ff" : "gray.400"}
                    fontSize={22}
                    onClick={onVote}
                    cursor="pointer"
                />
            </Flex>
            <Flex direction="column" width="100%">
                <Stack spacing={1} p="10px">
                    <Stack
                        direction="row"
                        spacing={0.6}
                        align="center"
                        fontSize="sm"
                    >
                        {/* home page check */}
                        <Text fontSize="xs">
                            Posted by u/{post.creatorDisplayName}{" "}
                            {moment(
                                new Date(post.createdAt.seconds * 1000)
                            ).fromNow()}
                        </Text>
                    </Stack>
                    <Text fontWeight={600}>{post.title}</Text>
                    <Text fontSize="0.83rem">{post.body}</Text>
                    {post.imageURL && (
                        <Flex justify="center" align="center" py={1}>
                            {loadingImg && <Skeleton width="100%" height="200px" borderRadius={4} />}
                            <Image
                                src={post.imageURL}
                                alt="post image"
                                maxHeight="460px"
                                display={loadingImg ? "none": "unset"}
                                onLoad={()=>setLoadingImg(false)}
                            />
                        </Flex>
                    )}
                </Stack>
                <Flex ml={1} mb={0.5} color="gray.500">
                    <Flex
                        align="center"
                        p="8px 10px"
                        borderRadius={4}
                        _hover={{ bg: "gray.200" }}
                        cursor="pointer"
                    >
                        <Icon as={Chat} mr={2} fontSize="lg" />
                        <Text fontSize="sm">{post.numberOfComments}</Text>
                    </Flex>
                    <Flex
                        align="center"
                        p="8px 10px"
                        borderRadius={4}
                        _hover={{ bg: "gray.200" }}
                        cursor="pointer"
                    >
                        <Icon as={Share} mr={2} />
                        <Text fontSize="sm">Share</Text>
                    </Flex>
                    <Flex
                        align="center"
                        p="8px 10px"
                        borderRadius={4}
                        _hover={{ bg: "gray.200" }}
                        cursor="pointer"
                    >
                        <Icon as={Bookmark} mr={2} />
                        <Text fontSize="sm">Save</Text>
                    </Flex>
                    <Flex
                        align="center"
                        p="8px 10px"
                        borderRadius={4}
                        _hover={{ bg: "red.400", color: "white" }}
                        cursor="pointer"
                        onClick={onDeletePost}
                    >
                        <Icon as={DeleteOutlined} mr={2} />
                        <Text fontSize="sm">Delete</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}
