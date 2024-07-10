import { Outlet } from 'react-router-dom';
import MainSideBar from "../components/sidebar/MainSideBar";

export default function Home() {
    return (
        <div className="flex ">
            <MainSideBar isAdmin={true} />
            <div className="flex-grow bg-gray-100 p-4">
                <Outlet />
            </div>
        </div>
    );
}
