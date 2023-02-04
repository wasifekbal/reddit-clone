import { Community } from "@/atoms/communitiesAtom";
import { Box, Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Reddit } from "react-bootstrap-icons";

type Props = {
    communityData: Community;
};

export default function Header({ communityData }: Props) {
    const isJoined = false;
    return (
        /* actual height in reddit is 180px */
        <Flex direction="column" width="100%" height="160px">
            <Box height="45%" bg="blue.400" />
            <Flex justify="center" bg="white" flexGrow={1}>
                <Flex
                    width="95%"
                    maxWidth="910px"
                    borderColor="red"
                >
                    {communityData.imageURL ? (
                        <Image alt="Community picture" />
                    ) : (
                        <Icon
                            as={Reddit}
                            fontSize="5rem"
                            position="relative"
                            top={-3}
                            color="blue.500"
                            border="4px solid white"
                            borderRadius="full"
                        />
                    )}
                    <Flex mx="1rem">
                        <Flex direction="column">
                            <Text fontWeight={700} fontSize="3xl">
                                {communityData.id}
                            </Text>
                            <Text
                                fontWeight={600}
                                fontSize="xs"
                                color="gray.500"
                            >
                                r/{communityData.id}
                            </Text>
                        </Flex>
                        <Button
                            ml={7}
                            mt="12px"
                            variant={isJoined ? "outline" : "solid"}
                            height="1.9rem"
                            px={8}
                            onClick={()=>{}}
                        >
                            {isJoined ? "Joined" : "Join"}
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}
