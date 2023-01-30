import { auth } from "@/firebase/clientApp";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { FC } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

const OAuthButtons: FC = () => {
    const [signInWithGoogle, user, loading, userErr] =
        useSignInWithGoogle(auth);
    return (
        <Flex direction="column" width="100%" mb={4}>
            <Button
                variant="oauth"
                mb={2}
                isLoading={loading}
                onClick={() => {
                    signInWithGoogle();
                }}
            >
                <Image
                    src="/images/googlelogo.png"
                    height="20px"
                    alt="googlelogo"
                    mr={2}
                />
                Continue with Google
            </Button>
            <Text textAlign="center" color="red" fontSize="0.8rem">
                {userErr?.message}
            </Text>
        </Flex>
    );
};

export default OAuthButtons;
