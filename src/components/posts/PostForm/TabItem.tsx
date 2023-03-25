import { Flex, Icon, Text } from "@chakra-ui/react";

type TabItemProps = {
    item: {
        id: number,
        title: string;
        icon: typeof Icon.arguments;
    };
    selected: boolean;
    setSelectedTab: (value: number) => void
};
export default function TabItem({ item, selected, setSelectedTab }: TabItemProps) {
    return (
        <Flex
            justify="center"
            align="center"
            flexGrow={1}
            py="1rem"
            cursor="pointer"
            _hover={{
                bg: "gray.50",
            }}
            color={selected ? "blue.500" : "gray.500"}
            borderBottomWidth={selected ? "2px": "1px" }
            borderBottomColor={selected ? "blue.500" : "gray.200"}
            borderRight="1px"
            borderRightColor="gray.200"
            onClick={()=>setSelectedTab(item.id)}
            fontWeight="semibold"
        >
            <Icon as={item.icon} mr={2} />
            <Text>{item.title}</Text>
        </Flex>
    );
}
