export default function ImageContent({ images, ...props}) {
    return (
        <div className="flex">
            {images.map((image, index) => (
                <div key={index} className="bg-stone-200 rounded overflow-hidden m-2">
                    <img src={image.src} alt={image.description} className="h-64 w-80 object-cover"/>
                    <div className="p-2 bg-green-300">
                        <h2 className="text-stone-600 font-bold text-lg">{image.title}</h2>
                        <p className="text-sm font-bold text-red-800">{image.message}</p>
                    </div>
                </div>
            ))}
        </div>
    )

}