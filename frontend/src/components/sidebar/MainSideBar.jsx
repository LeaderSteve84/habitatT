import { useState, useContext } from 'react';
import Sidebar, { SidebarItem } from './Sidebar';
import { BiHome, BiMessage, BiLogOut } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { FaRegAddressBook } from 'react-icons/fa';
import { BsBuildingAdd } from "react-icons/bs";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { Link, Outlet } from 'react-router-dom';
import { HiSpeakerphone } from "react-icons/hi";
import AuthContext from '../context/AuthProvider';




export default function MainSideBar({ name, email }) {
    const [isTenantManagementOpen, setIsTenantManagementOpen] = useState(false);
    const [isPropertyManagementOpen, setIsPropertyManagementOpen] = useState(false);
    const [isPropertyListingOpen, setIsPropertyListingOpen] = useState(false);
    const [isAnnouncementOpen, setIsAnnoucementOpen] = useState(false);
    const [isLogRequestOpen, setIsLogRequestOpen] = useState(false);

    const { auth } = useContext(AuthContext);

    const isAdmin = auth.role === 'admin'


    const toggleTenantManagement = () => {
        setIsTenantManagementOpen(!isTenantManagementOpen);
    };

    const togglePropertyManagement = () => {
        setIsPropertyManagementOpen(!isPropertyManagementOpen);
    };

    const togglePropertyListing = () => {
        setIsPropertyListingOpen(!isPropertyListingOpen);
    };

    const toggleAnnouncement = () => {
        setIsAnnoucementOpen(!isAnnouncementOpen);
    };

    const toggleLogRequest = () => {
        setIsLogRequestOpen(!isLogRequestOpen);
    };

    return (
        <div className="flex h-screen">
            <Sidebar name={name} email={email}>
                {isAdmin ? <p className='text-acent50 text-2xl font-bold'>Admin</p> :
                    <p className='text-acent50 text-2xl font-bold'>Tenant</p>}
                <Link to="/home/welcome">
                    <SidebarItem icon={<BiHome />} text="Home" />
                </Link>
                {isAdmin && (
                    <>
                        <div>
                            <div onClick={toggleTenantManagement} className="sidebar-item cursor-pointer flex items-center space-x-2 hover:bg-acent50">
                                <IoMdAddCircleOutline />
                                <span className='text-acent80 font-bold'>Tenant Management</span>
                            </div>
                            {isTenantManagementOpen && (
                                <div className="ml-4">
                                    <Link to="/home/add-tenant">
                                        <SidebarItem icon={<IoMdAddCircleOutline />} text="Add new Tenant" />
                                    </Link>
                                    <Link to="/home/view-tenant">
                                        <SidebarItem icon={<IoEyeOutline />} text="View all Tenants" />
                                    </Link>
                                </div>
                            )}
                        </div>
                        <div>
                            <div onClick={togglePropertyManagement} className="sidebar-item cursor-pointer flex items-center space-x-2 hover:bg-acent50">
                                <BsBuildingAdd />
                                <span className='text-acent80 font-bold'>Property Management</span>
                            </div>
                            {isPropertyManagementOpen && (
                                <div className="ml-4">
                                    <Link to="/home/property-entries">
                                        <SidebarItem icon={<BsBuildingAdd />} text="Property Entry" />
                                    </Link>
                                    <Link to="/home/view-property">
                                        <SidebarItem icon={<IoEyeOutline />} text="View all Properties" />
                                    </Link>
                                </div>
                            )}
                        </div>
                        <div>
                            <div onClick={togglePropertyListing} className="sidebar-item cursor-pointer flex items-center space-x-2 hover:bg-acent50">
                                <BsBuildingAdd />
                                <span className='text-acent80 font-bold'>Property Listing</span>
                            </div>
                            {isPropertyListingOpen && (
                                <div className="ml-4">
                                    <Link to="/home/publish-property">
                                        <SidebarItem icon={<BiHome />} text="Publish Property" />
                                    </Link>
                                    <Link to="/home/advert-property">
                                        <SidebarItem icon={<IoEyeOutline />} text="View Listed Properties" />
                                    </Link>
                                </div>
                            )}
                        </div>
                    </>
                )}
                <Link to="/home/messages">
                    <SidebarItem icon={<BiMessage />} text="Communication Board" />
                </Link>
                {isAdmin && (
                    <>
                        <div>
                            <div onClick={toggleAnnouncement} className="sidebar-item cursor-pointer flex items-center space-x-2 hover:bg-acent50">
                                < HiSpeakerphone />
                                <span className='text-acent80 font-bold'>Announcement</span>
                            </div>
                            {isAnnouncementOpen && (
                                <div className="ml-4">
                                    <Link to="/home/add-tenant">
                                        <SidebarItem icon={<IoMdAddCircleOutline />} text="Make Announcement" />
                                    </Link>
                                    <Link to="/home/view-tenant">
                                        <SidebarItem icon={<IoEyeOutline />} text="All Announcements" />
                                    </Link>
                                </div>
                            )}
                        </div>
                        <div>
                            <div onClick={toggleLogRequest} className="sidebar-item cursor-pointer flex items-center space-x-2 hover:bg-acent50">
                                <FaRegAddressBook />
                                <span className='text-acent80 font-bold'>Log Request</span>
                            </div>
                            {isLogRequestOpen && (
                                <div className="ml-4">
                                    <Link to="/home/request">
                                        <SidebarItem icon={<BsBuildingAdd />} text="Make Log Request" />
                                    </Link>
                                    <Link to="/home/view-property">
                                        <SidebarItem icon={<IoEyeOutline />} text="View Log Request" />
                                    </Link>
                                </div>
                            )}
                        </div>
                    </>
                )}
                {!isAdmin &&
                    <Link to="/home/update-profile">
                        <SidebarItem icon={<CgProfile />} text="Update Profile" />
                    </Link>}
                <Link to="/home/loggedout">
                    <SidebarItem icon={<BiLogOut />} text="Log Out" />
                </Link>
            </Sidebar>

            <div className="flex-grow bg-gray-100 p-4 ml-64">
                <Outlet />
            </div>
        </div>
    );
}
