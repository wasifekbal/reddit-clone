import AuthModal from "@/components/Modal/Auth/AuthModal";
import { auth } from "@/firebase/clientApp";
import { Button, Flex } from "@chakra-ui/react";
import { signOut, User } from "firebase/auth";
import { FC } from "react";
import AuthButtons from "./AuthButtons";
import Icons from "./Icons";

type Props = {
    user?: User | null;
};

const RightContent: FC<Props> = ({ user }) => {
    return (
        <>
            <AuthModal />
            <Flex justify="center" align="center" gap={1}>
                {user ? (
                    <>
                        <Icons />
                        <Button variant="solid" onClick={() => signOut(auth)}>
                            Logout
                        </Button>
                    </>
                ) : (
                    <AuthButtons />
                )}
                {/* <Menu /> */}
            </Flex>
        </>
    );
};

export default RightContent;
