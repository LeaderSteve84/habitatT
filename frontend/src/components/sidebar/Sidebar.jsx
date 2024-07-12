import { createContext, useContext } from 'react';

const SidebarContext = createContext();

export default function Sidebar({ name, email, children }) {
    return (
        <aside className="bg-white text-stone-100 h-full fixed w-64">
            <nav className='h-full flex flex-col bg-acent110 border-r shadow-sm'>
                <div className='p-4 pb-2 flex justify-between items-center'>
                    <img src="https://ik.imagekit.io/rmhnagyqw/habitatT/logo.png?updatedAt=1720008714144" className="w-24 ml-3" alt="habitatT" />
                </div>
                <SidebarContext.Provider>
                    <ul className='flex-1 px-3'>{children}</ul>
                </SidebarContext.Provider>
            </nav>
        </aside>
    );
}

export function SidebarItem({ icon, text, active, alert }) {
    return (
        <li
            className={`
                relative flex items-center py-2 px-3 my-1
                font-medium rounded-md cursor-pointer
                transition-colors group
                ${active
                    ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                    : "hover:bg-indigo-50 text-gray-600"
                }
            `}>
            {icon}
            <span className="ml-3 w-full">
                {text}
            </span>
            {alert && <div
                className="absolute right-2 w-2 h-2 rounded bg-indigo-400"
            ></div>}
        </li>
    );
}
