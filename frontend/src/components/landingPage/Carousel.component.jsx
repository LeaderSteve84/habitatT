import { useState } from "react";
import { FaRegArrowAltCircleRight, FaRegArrowAltCircleLeft } from "react-icons/fa";

export default function Carousel({ slides }) {

    const [current, setCurrent] = useState(0);

    let previousSlide = () => {
        if (current === 0) {
            setCurrent(slides.length - 1);
        } else setCurrent(current - 1);
    };

    let nextSlide = () => {
        if (current === slides.length - 1) {
            setCurrent(0);
        } else setCurrent(current + 1);
    };


    return (
        <div className="overflow-hidden relative">
            <div className={`flex transition ease-out duration-400`}
            style={
                {transform: `translateX(-${current * 100}%)`}
            }
            >
                {slides.map((slide) => {
                    return <img src={slide} alt="" />
                })}
            </div>

            <div className="absolute top-0 h-full w-full items-center justify-between text-white flex px-10">
                <button onClick={previousSlide}>
                    <FaRegArrowAltCircleLeft />
                </button>
                <button onClick={nextSlide}>
                    <FaRegArrowAltCircleRight />
                </button>
            </div>
        </div>
    )
}