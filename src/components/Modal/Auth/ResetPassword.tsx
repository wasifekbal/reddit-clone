import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/clientApp";
import { Button, Flex, Image, Input, Text } from "@chakra-ui/react";
import { FC, useState } from "react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";

type Props = {};

const ResetPassword: FC<Props> = () => {
    const setAuthModalState = useSetRecoilState(authModalState);
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);
    const [sendPasswordResetEmail, sending, error] =
        useSendPasswordResetEmail(auth);

    const onSumbit = async () => {
        console.log("reset");
        if (!email) return;
        await sendPasswordResetEmail(email);
        setSuccess(true);
    };

    return (
        <Flex direction="column" align="center" width="100%">
            <Image
                src="/images/redditFace.svg"
                alt="redditFace"
                height="3rem"
                mr={{
                    base: 2,
                    md: 0,
                }}
            />
            <Text mb={2} fontWeight="700">
                Reset your password
            </Text>
            {success ? (
                <Text textAlign="center">Password reset link is sent. Check you email</Text>
            ) : (
                <>
                    <Text fontSize="sm" mb={2} textAlign="center">
                        Enter your account&apos;s email address. We&apos;ll
                        email you a link to reset your password.
                    </Text>
                    <Input
                        required
                        name="email"
                        placeholder="Email"
                        type="email"
                        mb={2}
                        onChange={(e) => setEmail(e.target.value)}
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
                            bg: "white",
                            border: "1px solid",
                            borderColor: "blue.500",
                        }}
                        bg="gray.50"
                    />
                    <Button
                        variant={"solid"}
                        width="full"
                        height="35px"
                        my={2}
                        onClick={onSumbit}
                        isLoading={sending}
                    >
                        Reset Password
                    </Button>
                </>
            )}

            {/* bottom signin and signup buttons */}
            <Flex
                fontSize="0.8rem"
                justify="center"
                my={2}
                gap="1"
                color="blue.500"
            >
                <Text
                    fontWeight={700}
                    cursor="pointer"
                    onClick={() =>
                        setAuthModalState((prev) => ({
                            ...prev,
                            view: "login",
                        }))
                    }
                >
                    Log In
                </Text>
                <Text>|</Text>
                <Text
                    fontWeight={700}
                    cursor="pointer"
                    onClick={() =>
                        setAuthModalState((prev) => ({
                            ...prev,
                            view: "signup",
                        }))
                    }
                >
                    Sign Up
                </Text>
            </Flex>
        </Flex>
    );
};

export default ResetPassword;
