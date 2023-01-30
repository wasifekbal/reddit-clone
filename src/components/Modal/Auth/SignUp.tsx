import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/firebase/clientApp";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { FIREBASE_ERRORS } from "@/firebase/errors";

type Props = {};

const SignUp: FC<Props> = () => {
    const setAuthModalState = useSetRecoilState(authModalState);
    const [signUpForm, setSignUpForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [err, setErr] = useState("");

    const [createUserWithEmailAndPassword, user, loading, userErr] =
        useCreateUserWithEmailAndPassword(auth);

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (err) setErr("");
        if (signUpForm.password !== signUpForm.confirmPassword) {
            setErr("Passwords did not matched !!");
            return;
        }
        createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
    };
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSignUpForm((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };
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
            <Input
                required
                name="confirmPassword"
                placeholder="Confirm Password"
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
                {err ||
                    FIREBASE_ERRORS[
                        userErr?.message as keyof typeof FIREBASE_ERRORS
                    ]}
            </Text>
            <Button
                type="submit"
                width="100%"
                height="36px"
                my={2}
                isLoading={loading}
            >
                Sign Up
            </Button>
            <Flex fontSize="12px" justify="center">
                <Text mr={1}>Already a redditor?</Text>
                <Text
                    color="blue.500"
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
            </Flex>
        </form>
    );
};

export default SignUp;
