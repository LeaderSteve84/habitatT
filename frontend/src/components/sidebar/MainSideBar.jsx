import { useState } from 'react';
import Sidebar, { SidebarItem } from './Sidebar';
import { BiHome, BiMessage, BiLogOut } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { FaRegAddressBook } from 'react-icons/fa';
import { BsBuildingAdd } from "react-icons/bs";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

export default function MainSideBar({ name, email, isAdmin }) {
    const [isTenantManagementOpen, setIsTenantManagementOpen] = useState(false);
    const [isPropertyManagementOpen, setIsPropertyManagementOpen] = useState(false);
    const [isPropertyListingOpen, setIsPropertyListingOpen] = useState(false);
    const toggleTenantManagement = () => {
        setIsTenantManagementOpen(!isTenantManagementOpen);
    };
    const togglePropertyManagement = () => {
        setIsPropertyManagementOpen(!isPropertyManagementOpen);
    };
    const togglePropertyListing = () => {
        setIsPropertyListingOpen(!isPropertyListingOpen);
    };
    return (
        <div>
            <Sidebar name={name} email={email}>
                <Link to="/home/welcome">
                    <SidebarItem icon={<BiHome />} text="Home" />
                </Link>
                {isAdmin && (
                    <>
                        <div>
                            <div onClick={toggleTenantManagement} className="sidebar-item cursor-pointer flex items-center space-x-2">
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
                            <div onClick={togglePropertyManagement} className="sidebar-item cursor-pointer flex items-center space-x-2">
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
                            <div onClick={togglePropertyListing} className="sidebar-item cursor-pointer flex items-center space-x-2">
                                <BsBuildingAdd />
                                <span className='text-acent80 font-bold'>Property Listing</span>
                            </div>
                            {isPropertyListingOpen && (
                                <div className="ml-4">
                                    <Link to="/home/publish-property">
                                        <SidebarItem icon={<BiHome />} text="Publish Property" />
                                    </Link>
                                    <Link to="/home/view-listed-property">
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
                <Link to="/home/request">
                    <SidebarItem icon={<FaRegAddressBook />} text="Log Request" />
                </Link>
                <Link to="/home/profile">
                    <SidebarItem icon={<CgProfile />} text="Profile" />
                </Link>
                <Link to="/home/loggedout">
                    <SidebarItem icon={<BiLogOut />} text="Log Out" />
                </Link>
            </Sidebar>
        </div>
    );
}