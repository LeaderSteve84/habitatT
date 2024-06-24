import { LuChevronFirst, LuChevronLast } from 'react-icons/lu';
import logo from '../../assets/logo.png';
import { CgMoreVertical } from 'react-icons/cg';
import { createContext, useContext, useState } from 'react';

const SidebarContext = createContext();
export default function Sidebar({ name, email, children }) {
    const [expanded, setExpanded] = useState(true);
    return (
        <aside className={`bg-white text-stone-100 h-screen transition-all duration-300 ${expanded ? "w-64" : "w-16"}`}>
            <nav className='h-full flex flex-col bg-white border-r shadow-sm'>
                <div className='p-4 pb-2 flex justify-between items-center'>
                    <img src={logo} className={`overflow-hidden transition-all ${expanded ? "w-24 ml-3" : "w-0"}`} alt="habitatT" />
                    <button onClick={() => setExpanded(curr => !curr)} className='p-1.5 rounded-lg bg-gray-800 hover:bg-gray-500'>
                        {expanded ? <LuChevronFirst /> : <LuChevronLast />}
                    </button>
                </div>
                <SidebarContext.Provider value={{ expanded }}>
                    <ul className='flex-1 px-3'>{children}</ul>
                </SidebarContext.Provider>

                <div className='border-t flex p-3'>
                    <img src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
                        alt=""
                        className='w-10 h-10 rounded-md'
                    />
                    <div className={`flex justify-between items-center transition-all overflow-hidden ${expanded ? "ml-3 w-full" : "w-0"}`}>
                        <div className='leading-4'>
                            <h4 className='font-semibold text-gray-900'>{name}</h4>
                            <span className='text-xs text-gray-900'>{email}</span>
                        </div>
                        <CgMoreVertical size={20} />
                    </div>
                </div>
            </nav>
        </aside>
    );
}

export function SidebarItem({ icon, text, active, alert }) {
    const { expanded } = useContext(SidebarContext);

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
            <span
                className={`overflow-hidden transition-all whitespace-nowrap
                    ${expanded ? "ml-3 w-full" : "w-0"
                    }`}
            >
                {text}
            </span>
            {alert && <div
                className={`absolute right-2 w-2 h-2 rounded bg-indigo-400
                ${expanded ? "" : "top-2"}`}>

            </div>
            }

            {!expanded && <div className={`
                absolute left-full rounded-md px-2 py-1 ml-6
                bg-indigo-100 text-sm
                invisible opacity-20 -translate-x-3 transition-all
                group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
            `}
            >
                {text}
            </div>}
        </li>
    );
}
