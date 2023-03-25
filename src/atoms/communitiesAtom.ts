import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

// The actual community, when created.
export interface Community {
    id: string;
    creatorId: string;
    numberOfMembers: number;
    privacyType: "public" | "restricted" | "private";
    createdAt?: Timestamp;
    logoUrl?: string;
}

/* type of a community snippet. */
/* stored with the user's details in commSnips sub-collection. */
export type UserCommSnip = {
    communityId: string;
    isModerator?: boolean;
    logoUrl?: string;
};

/* a list of commSnip that will be fetched from user's details. */
type CommunityState = {
    userCommSnips: UserCommSnip[];
    currentComm?: Community;
};

/* default values for global community state */
const defaultCommState: CommunityState = {
    userCommSnips: [],
};

export const communityState = atom<CommunityState>({
    key: "commState",
    default: defaultCommState,
});
