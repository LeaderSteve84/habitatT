import Sidebar, { SidebarItem } from "./Sidebar"
import { BiHome, BiMessage, BiLogOut } from "react-icons/bi"
import { CgProfile } from "react-icons/cg"
import { FaRegAddressBook } from "react-icons/fa";

export default function MainSideBar({name, email}) {
    return (
        <div>
            <Sidebar name={name} email={email}>
                <SidebarItem icon={<BiHome />} text="Home" />
                <SidebarItem icon={<BiMessage />} text="Communication Board" />
                <SidebarItem icon={<FaRegAddressBook />} text="Log Request" />
                <SidebarItem icon={<CgProfile />} text="Profile" />
                <SidebarItem icon={<BiLogOut />} text="Log Out" />
            </Sidebar>
        </div>
    )
}