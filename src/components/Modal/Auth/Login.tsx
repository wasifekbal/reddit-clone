import { authModalState } from "@/atoms/authModalAtom";
import { auth, firestore } from "@/firebase/clientApp";
import { FIREBASE_ERRORS } from "@/firebase/errors";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";

type Props = {};

const Login: FC<Props> = () => {
    const setAuthModalState = useSetRecoilState(authModalState);
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });
    const [signInWithEmailAndPassword, userInfo, loading, userErr] =
        useSignInWithEmailAndPassword(auth);
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!loginForm.email || !loginForm.password) return;
        signInWithEmailAndPassword(loginForm.email, loginForm.password);
    };
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLoginForm((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    async function createUserDocument(user: User) {
        await setDoc(
            doc(firestore, "users", user.uid),
            JSON.parse(JSON.stringify(user)),
            { merge: true }
        );
    }

    useEffect(() => {
        if (!userInfo) return;
        createUserDocument(userInfo.user);
    }, [userInfo]);

    return (
        <form onSubmit={onSubmit}>
            <Input
                required
                name="email"
                placeholder="Email"
                type="email"
                mb={2}
                onChange={onChange}
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
            <Input
                required
                name="password"
                placeholder="Password"
                type="password"
                mb={2}
                onChange={onChange}
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
            <Text textAlign="center" color="red" fontSize="0.8rem">
                {
                    FIREBASE_ERRORS[
                        userErr?.message as keyof typeof FIREBASE_ERRORS
                    ]
                }
            </Text>
            <Button
                type="submit"
                width="100%"
                height="36px"
                my={2}
                isLoading={loading}
            >
                Log In
            </Button>
            <Flex fontSize="0.8rem" justify="center" mb={2}>
                <Text mr={1}>Forgot your password?</Text>
                <Text
                    color="blue.500"
                    fontWeight="700"
                    cursor="pointer"
                    onClick={() =>
                        setAuthModalState((prev) => ({
                            ...prev,
                            view: "resetPassword",
                        }))
                    }
                >
                    Reset
                </Text>
            </Flex>
            <Flex fontSize="12px" justify="center">
                <Text mr={1}>New to Reddit?</Text>
                <Text
                    color="blue.500"
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
        </form>
    );
};

export default Login;
