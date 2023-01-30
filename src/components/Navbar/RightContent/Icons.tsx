import { Flex, Icon } from "@chakra-ui/react";
import { FC } from "react";
import {GrAdd} from "react-icons/gr";
import { BsArrowUpRightCircle, BsChatDots } from "react-icons/bs";
import {
    IoFilterCircleOutline,
    IoNotificationsOutline,
    IoVideocamOutline

} from "react-icons/io5"

type Props = {};

const Icons: FC<Props> = () => {
    return (
        <Flex gap={3}>
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
                    borderRadius={8}
                    _hover={{ bg: "gray.200" }}
                >
                    <Icon as={BsArrowUpRightCircle} fontSize="22" />
                </Flex>
                <Flex
                    padding={1}
                    cursor="pointer"
                    borderRadius={8}
                    _hover={{ bg: "gray.200" }}
                >
                    <Icon as={IoFilterCircleOutline} fontSize="24" />
                </Flex>
                <Flex
                    padding={1}
                    cursor="pointer"
                    borderRadius={8}
                    _hover={{ bg: "gray.200" }}
                >
                    <Icon as={IoVideocamOutline} fontSize="24" />
                </Flex>
            </Flex>
            <>
                <Flex
                    padding={1}
                    cursor="pointer"
                    borderRadius={8}
                    _hover={{ bg: "gray.200" }}
                >
                    <Icon as={BsChatDots} fontSize="20" />
                </Flex>
                <Flex
                    padding={1}
                    cursor="pointer"
                    borderRadius={8}
                    _hover={{ bg: "gray.200" }}
                >
                    <Icon as={IoNotificationsOutline} fontSize="20" />
                </Flex>
                <Flex
                    padding={1}
                    cursor="pointer"
                    borderRadius={8}
                    _hover={{ bg: "gray.200" }}
                    display={{ base: "none", md: "flex" }}
                >
                    <Icon as={GrAdd} fontSize="20" />
                </Flex>
            </>
        </Flex>
    );
};

export default Icons;
