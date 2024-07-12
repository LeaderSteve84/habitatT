import { Link } from "react-router-dom"

export default function Navbar() {
    return (
        <div className="flex bg-stone-700 text-stone-50 justify-between items-center p-4 shadow-lg">
            <img src="https://ik.imagekit.io/rmhnagyqw/habitatT/logo.png?updatedAt=1720008714144" alt="logo" className='h-12 w-12 object-cover' />
            <ul className="flex gap-10">
                <Link to="/">
                    <li className="relative group cursor-pointer">
                        Home
                        <span className="absolute left-0 bottom-0 w-0 h-1 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                    </li>
                </Link>
                <Link to='/about'>

                    <li className="relative group cursor-pointer">
                        About Us
                        <span className="absolute left-0 bottom-0 w-0 h-1 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                    </li>
                </Link>
                <li className="relative group cursor-pointer">
                    Contact Us
                    <span className="absolute left-0 bottom-0 w-0 h-1 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                </li>
            </ul>
            <ul>
                <Link to="/login">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Login</button>
                </Link>
            </ul>
        </div>
    )
}
