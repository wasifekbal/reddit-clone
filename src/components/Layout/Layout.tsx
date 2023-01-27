import { FC, ReactNode } from "react";
import Navbar from "../Navbar/Navbar";

type Props = {
    children: ReactNode;
};

const Layout: FC<Props> = ({ children }: Props) => {
    return (
        <>
            <Navbar />
            <main>{children}</main>
        </>
    );
};

export default Layout;
