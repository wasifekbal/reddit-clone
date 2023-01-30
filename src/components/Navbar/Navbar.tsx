import { auth } from "@/firebase/clientApp";
import { Flex, Image } from "@chakra-ui/react";
import { FC } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import RightContent from "./RightContent/RightContent";
import SearchInput from "./SearchInput";

type Props = {};

const Navbar: FC<Props> = () => {
    const [user, loading, error] = useAuthState(auth);
    return (
        <Flex bg="white" height="44px" padding="6px 12px">
            <Flex align="center">
                <Image
                    src="/images/redditFace.svg"
                    alt="redditFace"
                    height="30px"
                    mr={{
                        base: 2,
                        md: 0
                    }}
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
            <RightContent user={user} />
        </Flex>
    );
};

export default Navbar;
