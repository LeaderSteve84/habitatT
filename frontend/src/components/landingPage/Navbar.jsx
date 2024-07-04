export default function Navbar() {
    return (
        <div className="flex bg-stone-500 text-stone-50 justify-between items-center p-4">
            <img src="https://ik.imagekit.io/rmhnagyqw/habitatT/logo.png?updatedAt=1720008714144" alt="logo image" className='h-16 w-16' />
            <ul className="flex gap-20">
                <li>Home</li>
                <li>About Us</li>
                <li>Contact Us</li>
            </ul>
            <button>Login</button>
        </div>
    )
}