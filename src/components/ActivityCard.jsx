export default function ActivityCard({ image, name, description, onImageClick, width = "w-1/4" }) {
    return (
        <div className={`${width} h-auto card`}>
            <div className="w-full overflow-hidden rounded-lg">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-50 object-cover cursor-pointer hover:scale-105 transition-transform duration-300 rounded-lg"
                    onClick={() => onImageClick(image)}
                />
            </div>
            <h2 className="section-title top">{name}</h2>
            <p className="text-content">{description}</p>
        </div>
    );
}