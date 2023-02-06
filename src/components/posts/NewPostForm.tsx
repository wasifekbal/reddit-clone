import { Flex, Icon } from "@chakra-ui/react";
import { useState } from "react";
import {
    BarChartLineFill,
    FileEarmarkTextFill,
    Image,
    Link45deg,
    Mic
} from "react-bootstrap-icons";
import TabItem from "./TabItem";

type SingleTabItem = {
    title: string;
    icon: typeof Icon.arguments;
};

const formTabs:SingleTabItem[] = [
    {
        title: "Post",
        icon: FileEarmarkTextFill,
    },
    {
        title: "Images & Videos",
        icon: Image,
    },
    {
        title: "Link",
        icon: Link45deg,
    },
    {
        title: "Poll",
        icon: BarChartLineFill,
    },
    {
        title: "Talk",
        icon: Mic,
    },
];

export default function NewPostForm() {
    const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
    return (
        <Flex direction="column" bg="white" borderRadius={4} mt={2}>
            <Flex width="100%">
                {formTabs.map((item, idx) => (
                    <TabItem
                        key={idx}
                        item={item}
                        selected={item.title === selectedTab}
                        setSelectedTab={setSelectedTab}
                    />
                ))}
            </Flex>
        </Flex>
    );
}
