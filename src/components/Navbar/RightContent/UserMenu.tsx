import { FC } from "react";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Flex,
    Icon,
    Text,
} from "@chakra-ui/react";
import { signOut, User } from "firebase/auth";
import { auth } from "@/firebase/clientApp";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import {
    BoxArrowInLeft,
    BoxArrowInRight,
    ChevronDown,
    Flower3,
    PersonCircle,
    PersonFill,
    Reddit,
} from "react-bootstrap-icons";

type Props = {
    user?: User | null;
};

const UserMenu: FC<Props> = ({ user }) => {
    const setAuthModalState = useSetRecoilState(authModalState);
    return (
        <Menu>
            <MenuButton
                cursor="pointer"
                paddingX={1}
                _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
                _expanded={{ outline: "1px solid", outlineColor: "gray.200" }}
                borderRadius="4"
            >
                <Flex align="center" gap={3}>
                    {user ? (
                        <>
                            <Icon
                                as={Reddit}
                                fontSize="2rem"
                                color="gray.300"
                                mr={-3}
                            />
                            <Flex
                                direction="column"
                                fontSize="xs"
                                align="flex-start"
                                display={{ base: "none", lg: "flex" }}
                                mx={1}
                            >
                                <Text fontWeight={600}>
                                    {user?.displayName ||
                                        user.email?.split("@")[0]}
                                </Text>
                                <Flex align="center">
                                    <Icon
                                        as={Flower3}
                                        color="brand.100"
                                        fontSize="sm"
                                    />
                                    {/* * */}
                                    <Text color="gray.500">1 karma</Text>
                                </Flex>
                            </Flex>
                        </>
                    ) : (
                        <Icon
                            as={PersonCircle}
                            color="gray.400"
                            fontSize="1.6rem"
                        />
                    )}
                    <ChevronDown />
                </Flex>
            </MenuButton>
            {user ? (
                <>
                    <MenuList>
                        <MenuItem
                            fontSize="sm"
                            fontWeight={600}
                            _hover={{ bg: "gray.100" }}
                            paddingY="10px"
                        >
                            <Flex align="center">
                                <Icon as={PersonFill} mr={2} fontSize={20} />
                                Profile
                            </Flex>
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem
                            fontSize="sm"
                            fontWeight={600}
                            _hover={{ bg: "gray.100" }}
                            onClick={() => signOut(auth)}
                        >
                            <Flex align="center">
                                <Icon
                                    as={BoxArrowInRight}
                                    mr={2}
                                    fontSize={20}
                                />
                                Logout
                            </Flex>
                        </MenuItem>
                    </MenuList>
                </>
            ) : (
                <MenuList>
                    <MenuItem
                        fontSize="sm"
                        fontWeight={600}
                        _hover={{ bg: "gray.100" }}
                        paddingY="10px"
                        onClick={() =>
                            setAuthModalState({
                                open: true,
                                view: "login",
                            })
                        }
                    >
                        <Flex align="center">
                            <Icon as={BoxArrowInLeft} mr={2} fontSize={20} />
                            Log In / Sign Up
                        </Flex>
                    </MenuItem>
                </MenuList>
            )}
        </Menu>
    );
};

export default UserMenu;
