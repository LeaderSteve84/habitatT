import Sidebar, { SidebarItem } from "./Sidebar"
import { BiHome, BiMessage, BiLogOut } from "react-icons/bi"
import { CgProfile } from "react-icons/cg"
import { FaRegAddressBook } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function MainSideBar({ name, email }) {
    return (
        <div>
            <Sidebar name={name} email={email}>
                <Link to={`/home`}>
                    <SidebarItem icon={<BiHome />} text="Home" />
                </Link>
                <Link to={`/home/messages`}>
                    <SidebarItem icon={<BiMessage />} text="Communication Board" />
                </Link>
                <Link to={`/home/request`}>
                    <SidebarItem icon={<FaRegAddressBook />} text="Log Request" />
                </Link>
                <Link to={`/home/profile`}>
                    <SidebarItem icon={<CgProfile />} text="Profile" />
                </Link>
                <Link to={`/home/`}>
                    <SidebarItem icon={<BiLogOut />} text="Log Out" />
                </Link>
            </Sidebar>
        </div>
    )
}