import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
    children: [ReactNode, ReactNode];
};

export default function PageContentLayout({ children }: Props) {
    return (
        <Flex justify="center" paddingY="1rem">
            {/* This flex is to prevent width at max 910px, */}
            {/* when the parent flex goes beyond it. */}
            <Flex
                /* border="1px solid green" */
                justify="center"
                width="95%"
                maxWidth="910px"
            >
                {/* left side layout */}
                <Flex
                    /* border="1px solid blue" */
                    direction="column"
                    width={{ base: "100%", md: "65%" }}
                    mr={{ base: 0, md: 6 }}
                >
                    {children[0]}
                </Flex>
                {/* right side layout */}
                <Flex
                    border="1px solid orange"
                    display={{ base: "none", md: "flex" }}
                    flexGrow={1}
                >
                    {children[1]}
                </Flex>
            </Flex>
        </Flex>
    );
}
