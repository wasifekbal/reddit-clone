import { authModalState } from "@/atoms/authModalAtom";
import { Flex } from "@chakra-ui/react";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import Login from "./Login";
import SignUp from "./SignUp";

type Props = {};

const AuthInputs: FC<Props> = () => {
    const modelState = useRecoilValue(authModalState);
    return (
        <Flex direction="column" align="center" width="100%" mt={4}>
        {modelState.view === "login" && <Login />}
        {modelState.view === "signup" && <SignUp />}
        </Flex>
    );
};

export default AuthInputs;
