import { SearchIcon } from "@chakra-ui/icons";
import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { FC } from "react";

type Props = {
    user?: User | null;
};

const SearchInput: FC<Props> = ({ user }) => {
    return (
        <Flex
            flexGrow={1}
            mr="2"
            maxWidth={user ? "auto" : "600px"}
            justify="center"
            align="center"
        >
            <InputGroup>
                <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.400" mb="1" />
                </InputLeftElement>
                <Input
                    placeholder="Search Reddit"
                    fontSize="14px"
                    _placeholder={{
                        color: "gray.500",
                    }}
                    _hover={{
                        bg: "white",
                        border: "1px solid",
                        borderColor: "blue.500",
                    }}
                    _focus={{
                        outline: "none",
                        border: "1px solid",
                        borderColor: "blue.500",
                    }}
                    _active={{}}
                    height="34px"
                    bg="gray.50"
                    borderRadius="full"
                />
            </InputGroup>
        </Flex>
    );
};

export default SearchInput;
