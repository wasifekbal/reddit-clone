import { Flex, Image } from "@chakra-ui/react";
import { FC } from "react";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";

type Props = {};

const Navbar: FC<Props> = () => {
    return (
        <Flex bg="white" height="44px" padding="6px 12px">
            <Flex align="center">
                <Image
                    src="/images/redditFace.svg"
                    alt="redditFace"
                    height="30px"
                />
                <Image
                    src="/images/redditText.svg"
                    alt="redditText"
                    height="46px"
                    display={{
                        base: "none",
                        md: "unset",
                    }}
                />
            </Flex>
            {/* <Directory /> */}
            <SearchInput />
            <RightContent />
        </Flex>
    );
};

export default Navbar;
