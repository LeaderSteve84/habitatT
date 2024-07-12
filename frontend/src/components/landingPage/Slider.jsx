import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React from "react";
import Slider from "react-slick";

export default function SimpleSlider() {
    const slides = [
        {
            src: 'https://wallpapercave.com/wp/wp4110691.jpg',
            title: 'Welcome to HabitatT',
            tagline: 'Connecting Tenants and Property Owners'
        },
        {
            src: 'https://wallpapercave.com/uwp/uwp4209888.jpeg',
            title: 'Find Your Perfect Home',
            tagline: 'Explore the best properties in the market'
        },
        {
            src: 'https://wallpapercave.com/wp/wp4012680.jpg',
            title: 'Easy Communication',
            tagline: 'Seamless communication with property owners'
        },
        {
            src: 'https://wallpapercave.com/wp/wp4110681.jpg',
            title: 'Professional Management',
            tagline: 'Efficient and reliable property management'
        }
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true,
        pauseOnHover: false,
    };

    return (
        <Slider {...settings} className="w-full h-full">
            {slides.map((slide, index) => (
                <div key={index} className="relative w-full h-screen">
                    <img className="w-full h-full object-cover" src={slide.src} alt={`slide-${index}`} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white p-4">
                        <h1 className="text-4xl font-bold mb-2">{slide.title}</h1>
                        <p className="text-xl">{slide.tagline}</p>
                    </div>
                </div>
            ))}
        </Slider>
    );
}
