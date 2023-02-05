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
export type UserCommSnip = {
    communityId: string;
    isModerator?: boolean;
    imageURL?: string;
};

/* a list of commSnip that will be fetched from user's details. */
type UserCommState = {
    userCommSnips: UserCommSnip[];
};

/* default values for global community state */
const defaultCommState: UserCommState = {
    userCommSnips: [],
};

export const userCommState = atom<UserCommState>({
    key: "commState",
    default: defaultCommState,
});
