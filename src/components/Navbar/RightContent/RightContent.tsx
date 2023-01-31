import AuthModal from "@/components/Modal/Auth/AuthModal";
import { Flex } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { FC } from "react";
import AuthButtons from "./AuthButtons";
import Icons from "./Icons";
import UserMenu from "./UserMenu";

type Props = {
    user?: User | null;
};

const RightContent: FC<Props> = ({ user }) => {
    return (
        <>
            <AuthModal />
            <Flex justify="center" align="center" gap={1}>
                {user ? <Icons /> : <AuthButtons />}
                <UserMenu user={user}/>
            </Flex>
        </>
    );
};

export default RightContent;
