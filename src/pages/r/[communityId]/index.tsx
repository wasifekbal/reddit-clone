import { Community, communityState } from "@/atoms/communitiesAtom";
import About from "@/components/community/About";
import CreatePostLink from "@/components/community/CreatePostLink";
import Header from "@/components/community/Header";
import NotFound from "@/components/community/NotFound";
import PageContentLayout from "@/components/Layout/PageContentLayout";
import Posts from "@/components/posts/Posts";
import { firestore } from "@/firebase/clientApp";
import { doc, getDoc } from "firebase/firestore";
import { GetServerSidePropsContext } from "next";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import safeJsonStringify from "safe-json-stringify";

type Props = {
    communityData: Community;
};

export default function CommunityPage({ communityData }: Props) {
    const setCommStateValue = useSetRecoilState(communityState);

    useEffect(() => {
        if (!communityData) return;
        setCommStateValue((prev) => ({
            ...prev,
            currentComm: communityData,
        }));
    }, []);

    if (!communityData) {
        return <NotFound />;
    }

    return (
        <>
            <Header communityData={communityData} />
            <PageContentLayout>
                <>
                    <CreatePostLink />
                    <Posts communityData={communityData} />
                </>
                <>
                    <About communityData={communityData} />
                </>
            </PageContentLayout>
        </>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        /* doc reference of the community */
        const commDocRef = doc(
            firestore,
            "communities",
            context.query.communityId as string
        );
        /* get the community doc */
        const commDoc = await getDoc(commDocRef);
        /* if exists, safely stringify and parse the object */
        /* else, be it an empty string. */
        const commData = commDoc.exists()
            ? JSON.parse(
                  safeJsonStringify({
                      id: commDoc.id,
                      ...commDoc.data(),
                  })
              )
            : "";

        return {
            props: {
                communityData: commData,
            },
        };
    } catch (error) {
        console.log("communityPage getserversideprops error: ", error);
    }
}
