import { createCommModalState } from "@/atoms/createCommModalAtom";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useSetRecoilState } from "recoil";

type Props = {};

function NotFound({}: Props) {
    const setCreateCommModal = useSetRecoilState(createCommModalState);
    return (
        <Flex
            direction="column"
            justify="center"
            align="center"
            minHeight="84vh"
        >
            <Box
                bg="#a8a8a8"
                minWidth="6rem"
                minHeight="6rem"
                borderRadius="full"
            ></Box>
            <Text fontWeight={600} fontSize="lg" mt={8}>
                Sorry, there aren’t any communities on Reddit with that name.
            </Text>
            <Text fontWeight={500} fontSize="sm" mt={4}>
                This community may have been banned or the community name is
                incorrect.
            </Text>
            <Flex mt={12}>
                <Button
                    fontSize="sm"
                    mr={4}
                    height={8}
                    variant="outline"
                    fontWeight={700}
                    onClick={() => setCreateCommModal({ open: true })}
                >
                    Create Community
                </Button>
                <Link href="/">
                    <Button fontSize="sm" height={8}>
                        GO HOME
                    </Button>
                </Link>
            </Flex>
        </Flex>
    );
}

export default NotFound;
