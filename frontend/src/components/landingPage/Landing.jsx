import { SolutionFeatures } from "../../ImageData"
import ImageContent from "./ImageContent"
import Navbar from "./Navbar"
export default function Landing() {
    return (
        <>
            <Navbar />
            <section>
                <img src="" alt="" />
            </section>

            <section className="why-us">
                <h2>Why you need HabitatT</h2>
                <ImageContent images={SolutionFeatures} />
            </section>

            <section className="propeties-rent">
                <h2>Rent Properties</h2>
                <div>
                    <img src="" alt="communication board" />
                    <img src="" alt="request log" />
                    <img src="" alt="property management" />
                    <img src="" alt="classification" />
                </div>
                <button>Sign up</button>
            </section>

            <section className="team">
                <h2>Meet the team</h2>
            </section>

            <section className="footer">

            </section>
        </>
    )
}