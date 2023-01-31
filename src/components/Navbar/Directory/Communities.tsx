import CreateCommunityModal from "@/components/Modal/CreateCommunity/CreateCommunityModal";
import { Flex, Icon, MenuItem } from "@chakra-ui/react";
import { FC, useState } from "react";
import { PlusLg } from "react-bootstrap-icons";

type Props = {};

const Communities: FC<Props> = () => {
    const [open, setOpen] = useState(false);
    return (
        <div>
            <CreateCommunityModal open={open} handleClose={()=>setOpen(false)} />
            <MenuItem
                fontSize="sm"
                _hover={{ bg: "gray.100" }}
                paddingY="10px"
                onClick={()=>setOpen(true)}
            >
                <Flex align="center">
                    <Icon as={PlusLg} fontSize={20} mr={2} />
                    Create community
                </Flex>
            </MenuItem>
        </div>
    );
};

export default Communities;
