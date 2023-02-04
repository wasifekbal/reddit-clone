import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

// The actual community, when created.
export interface Community {
    id: string;
    creatorId: string;
    numberOfMembers: number;
    privacyType: "public" | "restricted" | "private";
    createdAt?: Timestamp;
    imageURL?: string;
}

/* type of a community snippet. */
/* stored with the user's details in commSnips sub-collection. */
type CommSnip = {
    communityId: string;
    isModerator?: boolean;
    imageURL?: string;
};

/* a list of commSnip that will be fetched from user's details. */
type CommState = {
    commSnips: CommSnip[];
};

/* default values for global community state */
const defaultCommState: CommState = {
    commSnips: [],
};

export const communityState = atom<CommState>({
    key: "commState",
    default: defaultCommState,
});
