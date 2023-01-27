import { Button, Flex, Image } from "@chakra-ui/react";
import { FC } from "react";

const OAuthButtons: FC = () => {
    return (
        <Flex direction="column" width="100%" mb={4}>
            <Button variant="oauth" mb={2}>
                <Image
                    src="/images/googlelogo.png"
                    height="20px"
                    alt="googlelogo"
                    mr={2}
                />
                Continue with Google
            </Button>
        </Flex>
    );
};

export default OAuthButtons;
