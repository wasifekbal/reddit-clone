import { HomeFilled } from "@ant-design/icons";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, Icon, Menu, MenuButton, MenuList, Text } from "@chakra-ui/react";
import { FC } from "react";
import Communities from "./Communities";

type Props = {};

const Directory: FC<Props> = () => {
    return (
        <Menu>
            <MenuButton
                cursor="pointer"
                paddingX={1}
                _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
                _expanded={{ outline: "1px solid", outlineColor: "gray.200" }}
                borderRadius="4"
                mx={3}
            >
                <Flex
                    align="center"
                    justify="space-between"
                    width={{ base: "auto", lg: "200px" }}
                >
                    <Flex align="center">
                        <Icon
                            as={HomeFilled}
                            color="gray.700"
                            fontSize="1.3rem"
                        />
                        <Text
                            fontSize="sm"
                            fontWeight={500}
                            display={{ base: "none", lg: "unset" }}
                            ml={2}
                        >
                            Home
                        </Text>
                    </Flex>
                    <ChevronDownIcon fontSize="1.2rem" />
                </Flex>
            </MenuButton>
            <MenuList>
                <Communities />
            </MenuList>
        </Menu>
    );
};

export default Directory;
