import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import Slider from "react-slick";

export default function SimpleSlider() {
    let slides = [
        'https://wallpapercave.com/wp/wp4110691.jpg',
        'https://wallpapercave.com/uwp/uwp4209888.jpeg',
        'https://wallpapercave.com/wp/wp4012680.jpg',
        'https://wallpapercave.com/wp/wp4110681.jpg'
    ];
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <Slider {...settings} className="min-w-full">
            <div>
                <img className="w-full h-80 object-cover" src={slides[0]} alt="" />
            </div>
            <div>
                <img className="w-full h-80 object-cover" src={slides[1]} alt="" />
            </div>
            <div>
                <img className="w-full h-80 object-cover" src={slides[2]} alt="" />
            </div>
            <div>
                <img className="w-full h-80 object-cover" src={slides[3]} alt="" />
            </div>

        </Slider>
    );
}