import { SolutionFeatures } from "../../ImageData"
import ImageContent from "./ImageContent"
import Navbar from "./Navbar"
import SimpleSlider from "./Slider"
import { Buildings, SolutionFeatures, Team } from "../../ImageData"
import ImageContent from "./ImageContent"
import Footer from "./Footer"
import estate from '../../assets/estate.jpg'

export default function Landing() {
    return (
        <>
            <Navbar />
            <section className="movingPhoto w-full min-w-full">
                <SimpleSlider />
            </section>

            <section className="features">
                <h2 className="text-stone-600 text-lg font-bold">Why you need HabitatT</h2>
                <div className="flex gap-4 p-4">
                    <img src={estate} alt="estate" className="h-80" />
                    <ImageContent images={SolutionFeatures} className='flex' height='h-32' width='w-32' />
                </div>
            </section>

            <section className="Properties bg-gray-300 p-4">
                <h2 className="text-stone-600 text-lg font-bold">Rent Properties</h2>
                <ImageContent images={Buildings} className='flex' />
                <button className="text-white w-32 text-lg border-2 border-blue-600 p-2 bg-blue-600 block m-auto rounded-lg mt-6">View All</button>
            </section>

            <section className="Team bg-gray-600 p-4">
                <h2 className="text-white text-lg font-bold">Meet the Team</h2>
                <ImageContent images={Team} className='flex' />
            </section>

            <Footer />
        </>
    )
}