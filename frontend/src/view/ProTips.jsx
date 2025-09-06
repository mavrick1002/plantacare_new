import React from "react";
import { Link } from "react-router-dom";

function PlantTips() {
    const tips = [
        {
            title: "Water Wisely",
            description: "Water your plants early in the morning to ensure deep hydration and reduce evaporation.",
            image: "https://img.freepik.com/free-photo/beautiful-biophilic-scene_23-2151897500.jpg?semt=ais_hybrid&w=740"
        },
        {
            title: "Use Organic Fertilizers",
            description: "Boost plant growth naturally with organic compost, making your soil richer over time.",
            image: "https://png.pngtree.com/background/20250206/original/pngtree-organic-fertilizer-texture-background-in-agriculture-picture-image_13584220.jpg"
        },
        {
            title: "Maximize Sunlight",
            description: "Give your indoor plants plenty of bright, indirect sunlight for best results.",
            image: "https://static.vecteezy.com/system/resources/thumbnails/055/979/737/small_2x/the-sun-shines-through-the-leaves-of-a-tree-free-photo.jpeg"
        },
        {
            title: "Prune Regularly",
            description: "Trim dead leaves and stems to encourage healthier and faster growth.",
            image: "https://www.bhg.com/thmb/Cr2QHKI9Ls-suZu3o_l_SBrdr0A=/1300x0/filters:no_upscale():strip_icc()/pruning-lilac-100168077-3d3f59f15d674f8ab1a8c818f9bd8d1e.jpg"
        },
        {
            title: "Monitor Soil Moisture",
            description: "Always check the soil before watering to avoid drowning your plants.",
            image: "https://5.imimg.com/data5/SELLER/Default/2024/6/430682491/BO/JF/HB/41622768/the-guru-shop-3-in-1-soil-moisture-plant-tester-round.jpg"
        },
        {
            title: "Maintain Humidity",
            description: "Mist your plants occasionally to keep the air around them humid and healthy.",
            image: "https://cdn11.bigcommerce.com/s-tjrce8etun/product_images/uploaded_images/indoor-plant.jpg"
        },
        {
            title: "Ensure Good Drainage",
            description: "Use pots with drainage holes to prevent water from collecting at the bottom.",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdYHQXd_gaUHsRzv3uCFinMjMnsWqv9mAYXw&s"
        },
        {
            title: "Rotate Your Plants",
            description: "Rotate your pots occasionally to make sure all sides receive even sunlight.",
            image: "https://m.media-amazon.com/images/I/71Hx3OfX3hL.jpg"
        },
        {
            title: "Clean Leaves",
            description: "Gently wipe the leaves with a damp cloth to help the plant breathe better and photosynthesize efficiently.",
            image: "https://www.thespruce.com/thmb/Xj7732jdEft55BfKMOUyTuUWKO8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/how-to-clean-houseplant-leaves-1403205-12-ad4ee5bb9dd34518b4809b32af89f7d8.jpg"
        },
    ];

    return (
        <div className="flex flex-col items-center p-8 min-h-screen bg-gradient-to-br from-green-100 to-green-300">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-green-800 mb-4">Ultimate Plant Care Tips</h1>
                <p className="text-green-700 text-lg max-w-2xl mx-auto">
                    Take your plant parenting skills to the next level! Follow these simple yet effective tips for vibrant, thriving plants.
                </p>
            </div>
            

            {/* Tips Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl">
                {tips.map((tip, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-2 transition duration-300 flex flex-col"
                    >
                        <img src={tip.image} alt={tip.title} className="h-48 w-full object-cover" />
                        <div className="p-6 flex flex-col flex-grow justify-between">
                            <h2 className="text-2xl font-semibold text-green-800 mb-2">{tip.title}</h2>
                            <p className="text-green-700 text-base">{tip.description}</p>
                        </div>
                        
                    </div>
                ))}
                
            </div>
            {/* Add button at the bottom */}
            <div className="text-3xl mt-10 text-right mb-10 w-full max-w-7xl">
                <Link
                    to="/plants"
                    className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
                >
                    Go to Previous Page
                </Link>
            </div>
        </div>
        
    );
}

export default PlantTips;