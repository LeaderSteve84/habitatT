import logo from '../../assets/logo.jpeg';

export default function Navbar() {
    return (
        <div className="flex bg-stone-500 text-stone-50 justify-between p-4">
            <img src={logo} alt="logo image" className='h-16 w-16'/>
            <ul className="flex gap-20">
                <li>Home</li>
                <li>About Us</li>
                <li>Contact Us</li>
            </ul>
            <button>Login</button>
        </div>
    )
}