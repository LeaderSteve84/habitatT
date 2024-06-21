import Navbar from "./components/landingPage/Navbar"
import { SolutionFeatures } from "../src/ImageData"
import ImageContent from "./components/landingPage/ImageContent"

export default function App() {
  return (
    <>
      <Navbar />
        <ImageContent images={SolutionFeatures}/>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>

    </>
  )
}