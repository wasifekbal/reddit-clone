import { authModalState } from "@/atoms/authModalAtom";
import {
    Community,
    UserCommSnip,
    userCommState,
} from "@/atoms/communitiesAtom";
import { auth, firestore } from "@/firebase/clientApp";
import {
    collection,
    doc,
    getDocs,
    increment,
    writeBatch,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useSetRecoilState } from "recoil";

export default function useCommunityData() {
    const [user] = useAuthState(auth);
    const [userCommStateValue, setUserCommStateValue] =
        useRecoilState(userCommState);
    const setAuthModalState = useSetRecoilState(authModalState);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");

    function onJoinOrLeaveComm(communityData: Community, isJoined: boolean) {
        if (!user) {
            setAuthModalState({
                open: true,
                view: "login",
            });
            return;
        }
        if (isJoined) {
            leaveCommunity(communityData.id);
            return;
        }
        joinCommunity(communityData);
    }
    async function getUserCommSnips() {
        setLoading(true);
        try {
            // get the user's community snippets
            const snippetDocs = await getDocs(
                collection(firestore, `users/${user?.uid}/commSnips`)
            );
            const snips = snippetDocs.docs.map((doc) => ({ ...doc.data() }));
            console.log(snips);
            setUserCommStateValue((prev) => ({
                ...prev,
                userCommSnips: snips as UserCommSnip[],
            }));
        } catch (error: any) {
            console.log("getUserCommSnips err: ", error);
            setErr(error.message);
        }
        setLoading(false);
    }
    async function joinCommunity(communityData: Community) {
        setLoading(true);
        try {
            // batch write operation
            const batch = writeBatch(firestore);
            // creating a new community snippet in user's commSnips sub-collection
            const newCommSnip: UserCommSnip = {
                communityId: communityData.id,
                imageURL: communityData.imageURL || "",
            };
            batch.set(
                doc(
                    firestore,
                    `users/${user?.uid}/commSnips`,
                    communityData.id
                ),
                newCommSnip
            );
            // do numberOfMembers+=1 in community doc at `communities/`.
            batch.update(doc(firestore, "communities", communityData.id), {
                numberOfMembers: increment(1),
            });
            await batch.commit();
            // update recoil user community state with the new entry.
            setUserCommStateValue((prev) => ({
                ...prev,
                userCommSnips: [...prev.userCommSnips, newCommSnip],
            }));
        } catch (error: any) {
            console.log("joinCommunity err: ", error);
            setErr(error.message);
        }
        setLoading(false);
    }
    async function leaveCommunity(commId: string) {
        setLoading(true);
        try {
            // batch write operation
            const batch = writeBatch(firestore);
            // delete the community snippet in user's commSnips sub-collection
            batch.delete(
                doc(firestore, `users/${user?.uid}/commSnips`, commId)
            );
            // do numberOfMembers-=1 in community doc at `communities/`.
            batch.update(doc(firestore, "communities", commId), {
                numberOfMembers: increment(-1),
            });
            await batch.commit();
            // update recoil user community state with the new entry.
            setUserCommStateValue((prev) => ({
                ...prev,
                userCommSnips: prev.userCommSnips.filter(
                    (item) => item.communityId !== commId
                ),
            }));
        } catch (error: any) {
            console.log("leaveCommunity err: ", error);
            setErr(error.message);
        }
        setLoading(false);
    }

    useEffect(() => {
        if (!user) return;
        getUserCommSnips();
    }, [user]);

    return {
        userCommStateValue,
        onJoinOrLeaveComm,
        loading,
    };
}
