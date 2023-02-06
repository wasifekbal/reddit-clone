import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/clientApp";
import { Flex, Icon, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Image, Link45deg, Reddit } from "react-bootstrap-icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";

export default function CreatePostLink() {
    const [user] = useAuthState(auth);
    const router = useRouter();
    const setAuthModalState = useSetRecoilState(authModalState);
    function handleOnClick() {
        if (!user) {
            setAuthModalState({open: true, view: "login"});
            return;
        }
        const {communityId} = router.query;
        router.push(`/r/${communityId}/submit`);
    }
    return (
        <Flex
            justify="space-evenly"
            align="center"
            bg="white"
            p="2"
            border="1px solid"
            borderColor="gray.300"
            borderRadius={4}
            mb={2}
            height="3.5rem"
        >
            <Icon as={Reddit} fontSize="36px" color="gray.300" mr={4} cursor="pointer" />
            <Input
                size="lg"
                placeholder="Create post"
                bg="gray.50"
                height="36px"
                fontSize="sm"
                borderColor="gray.300"
                borderRadius={4}
                _hover={{
                    bg: "gray.50",
                    border: "1px solid",
                    borderColor: "blue.500",
                }}
                _focus={{
                    bg: "white",
                    outline: "none",
                    border: "1px solid",
                    borderColor: "blue.500",
                }}
                _placeholder={{
                    color: "gray.400",
                }}
                mr={4}
                onClick={handleOnClick}
            />
            <Icon as={Image} fontSize="1.3rem" color="gray.400" mr={4} cursor="pointer" />
            <Icon as={Link45deg} fontSize="1.5rem" color="gray.400" mr={1} cursor="pointer" />
        </Flex>
    );
}
