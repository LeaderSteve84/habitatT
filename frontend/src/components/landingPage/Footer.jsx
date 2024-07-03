export default function Footer() {
    return (
        <section className="bg-green-800 text-white text-lg">
            <div className="flex justify-between mb-4 p-4">
                <p className="basis-1/3   text-center">Habitat is about having proper communication with tenants and property owners</p>
                <ul className="flex justify-center items-center gap-6 basis-1/3">
                    <li>Login</li>
                    <li>Contact Us</li>
                    <li>About Us</li>
                </ul>
                <div className="basis-1/3 flex justify-center gap-4  items-center">
                    <img className='h-8' src="https://ik.imagekit.io/rmhnagyqw/habitatT/mail.png?updatedAt=1720008711166" alt="email" />
                    <img className='h-8' src="https://ik.imagekit.io/rmhnagyqw/habitatT/facebook.png?updatedAt=1720008710523" alt="facebook" />
                    <img className='h-8' src="https://ik.imagekit.io/rmhnagyqw/habitatT/twitter.png?updatedAt=1720008710560" alt="twitter" />
                    <img className='h-8' src="https://ik.imagekit.io/rmhnagyqw/habitatT/linkedin.png?updatedAt=1720008709820" alt="linkedIn" />
                </div>
            </div>
            <p className="text-center">Copyright HabitatT 2024</p>
        </section>
    )
}