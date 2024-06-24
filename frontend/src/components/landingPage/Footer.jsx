import linkedin from '../../assets/linkedin.png'
import email from '../../assets/mail.png'
import twitter from '../../assets/twitter.png'
import facebook from '../../assets/facebook.png'

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
                    <img className='h-8' src={email} alt="email" />
                    <img className='h-8' src={facebook} alt="facebook" />
                    <img className='h-8' src={twitter} alt="twitter" />
                    <img className='h-8' src={linkedin} alt="linkedIn" />
                </div>
            </div>
            <p className="text-center">Copyright HabitatT 2024</p>
        </section>
    )
}