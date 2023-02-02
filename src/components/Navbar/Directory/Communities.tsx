import { createCommModalState } from "@/atoms/createCommModalAtom";
import CreateCommunityModal from "@/components/Modal/CreateCommunity/CreateCommunityModal";
import { Flex, Icon, MenuItem } from "@chakra-ui/react";
import { FC } from "react";
import { PlusLg } from "react-bootstrap-icons";
import { useSetRecoilState } from "recoil";

type Props = {};

const Communities: FC<Props> = () => {
    const setCreateCommModalState = useSetRecoilState(createCommModalState);
    return (
        <div>
            <CreateCommunityModal />
            <MenuItem
                fontSize="sm"
                _hover={{ bg: "gray.100" }}
                paddingY="10px"
                onClick={() => setCreateCommModalState({ open: true })}
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
