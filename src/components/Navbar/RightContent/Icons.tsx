import { Flex, Icon } from "@chakra-ui/react";
import { FC } from "react";
import {
    ArrowUpRightCircle,
    Bell,
    CameraVideo,
    ChatDots,
    FilterCircle,
    PlusLg,
} from "react-bootstrap-icons";

type Props = {};

const Icons: FC<Props> = () => {
    return (
        <Flex gap={3} mr={2}>
            <Flex
                display={{ base: "none", md: "flex" }}
                align="center"
                borderRight="1px solid"
                borderColor="gray.200"
                gap={3}
                pr={2}
            >
                <Flex
                    padding={1}
                    cursor="pointer"
                    borderRadius={4}
                    _hover={{ bg: "gray.200" }}
                >
                    <Icon as={ArrowUpRightCircle} fontSize="22" />
                </Flex>
                <Flex
                    padding={1}
                    cursor="pointer"
                    borderRadius={4}
                    _hover={{ bg: "gray.200" }}
                >
                    <Icon as={FilterCircle} fontSize="24" />
                </Flex>
                <Flex
                    padding={1}
                    cursor="pointer"
                    borderRadius={4}
                    _hover={{ bg: "gray.200" }}
                >
                    <Icon as={CameraVideo} fontSize="24" />
                </Flex>
            </Flex>
            <>
                <Flex
                    padding={1}
                    cursor="pointer"
                    borderRadius={4}
                    _hover={{ bg: "gray.200" }}
                >
                    <Icon as={ChatDots} fontSize="20" />
                </Flex>
                <Flex
                    padding={1}
                    cursor="pointer"
                    borderRadius={4}
                    _hover={{ bg: "gray.200" }}
                >
                    <Icon as={Bell} fontSize="20" />
                </Flex>
                <Flex
                    padding={1}
                    cursor="pointer"
                    borderRadius={4}
                    _hover={{ bg: "gray.200" }}
                    display={{ base: "none", md: "flex" }}
                >
                    <Icon as={PlusLg} fontSize="20" />
                </Flex>
            </>
        </Flex>
    );
};

export default Icons;
