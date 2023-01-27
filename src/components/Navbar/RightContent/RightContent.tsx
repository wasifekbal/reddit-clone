import AuthModal from "@/components/Modal/Auth/AuthModal";
import { Flex } from "@chakra-ui/react";
import { FC } from "react";
import AuthButtons from "./AuthButtons";

type Props = {
    // user: any
};

const RightContent: FC<Props> = () => {
    return (
        <>
            <AuthModal />
            <Flex justify="center" align="center" gap={1}>
                <AuthButtons />
            </Flex>
        </>
    );
};

export default RightContent;
