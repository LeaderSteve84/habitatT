export default function ImageContent({ images }) {
    return (
        <div className="flex">
            {images.map((image, index) => (
                <div key={index} className="bg-stone-200 rounded overflow-hidden m-2">
                    <img src={image.src} alt={image.description} className="h-8"/>
                    <div className="p-2 bg-green-300 w-full">
                        <h2 className="text-stone-600 text-lg">{image.title}</h2>
                        <p className="text-sm text-red-300">{image.message}</p>
                    </div>
                </div>
            ))}
        </div>
    )

}