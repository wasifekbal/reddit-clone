import { authModalState } from "@/atoms/authModalAtom";
import { Button } from "@chakra-ui/react";
import { FC } from "react";
import { useSetRecoilState } from "recoil";

type Props = {};

const AuthButtons: FC<Props> = () => {
    const setAuthModalState = useSetRecoilState(authModalState);
    return (
        <>
            <Button
                variant={"outline"}
                height="28px"
                display={{ base: "none", sm: "flex" }}
                width={{ base: "70px", md: "110px" }}
                onClick={() => setAuthModalState({ open: true, view: "login" })}
            >
                Log In
            </Button>
            <Button
                mr={2}
                height="28px"
                display={{ base: "none", sm: "flex" }}
                width={{ base: "70px", md: "110px" }}
                onClick={() =>
                    setAuthModalState({ open: true, view: "signup" })
                }
            >
                Sign Up
            </Button>
        </>
    );
};

export default AuthButtons;
