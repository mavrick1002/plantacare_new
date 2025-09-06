import React, { useState } from "react";
import { Link } from 'react-router-dom'; 

const MarketplacePage = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const plants = [
  {
    id: 1,
    name: "Sunflower",
    price: 20,
    image: "https://upload.wikimedia.org/wikipedia/commons/4/40/Sunflower_sky_backdrop.jpg",
  },
  {
    id: 2,
    name: "Marigold",
    price: 15,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSSPxsJ_WtcQ2ANuQU8i4Pk_6oPcUkTMR1vA&s",
  },
  {
    id: 3,
    name: "Geranium",
    price: 18,
    image: "https://t3.ftcdn.net/jpg/02/13/93/96/360_F_213939613_kWj1ppuuO3tTgpM1T4TYh4JvrckYxaJY.jpg",
  },
  {
    id: 4,
    name: "Hibiscus",
    price: 25,
    image: "https://images.stockcake.com/public/6/9/a/69a50e67-22d3-435b-b170-984721591d35_large/floating-hibiscus-flower-stockcake.jpg",
  },
  {
    id: 5,
    name: "Petunia",
    price: 12,
    image: "https://thumbs.dreamstime.com/b/purple-mexican-petunia-beautiful-blooming-flower-beautiful-blooming-purple-mexican-petunia-green-leaves-perfect-floral-364251739.jpg",
  },
  {
    id: 6,
    name: "Basil",
    price: 8,
    image: "https://meadowsfarms.com/great-big-greenhouse-gardening-blog/wp-content/uploads/sites/2/2021/04/basil-1.jpg",
  },
  {
    id: 7,
    name: "Areca Palm",
    price: 40,
    image: "https://static.toiimg.com/thumb/113804946/113804946.jpg?height=746&width=420&resizemode=76&imgsize=148404",
  },
  {
    id: 8,
    name: "Aloe Vera",
    price: 15,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNNidkpouM51QUB2CHybm8ewyW9QdGGxH62g&s",
  },
  {
    id: 9,
    name: "Cactus",
    price: 10,
    image: "https://www.familyhandyman.com/wp-content/uploads/2018/03/shutterstock_1021684594.jpg",
  },
  {
    id: 10,
    name: "Fiddle Leaf Fig",
    price: 35,
    image: "https://i0.wp.com/www.gardening4joy.com/wp-content/uploads/2024/02/Fiddle-Leaf-Fig-Main2.jpg?resize=1080%2C1440&ssl=1",
  },
  {
    id: 11,
    name: "Peace Lily",
    price: 12,
    image: "https://www.plantingtree.com/cdn/shop/products/Peace_Lily_6_FGT_grande.jpg?v=1654112674",
  },
  {
    id: 12,
    name: "Spider Plant",
    price: 8,
    image: "https://cityfloralgreenhouse.com/wp-content/uploads/2020/09/spider-plant.jpg",
  },
  {
    id: 13,
    name: "Hydrangea",
    price: 30,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIyhiwgg2QUKx-Pl7K7ljjnODR75kz-cGsHQ&s",
  },
  {
    id: 14,
    name: "Begonia",
    price: 18,
    image: "https://hips.hearstapps.com/hmg-prod/images/how-grow-begonias-1615811719.jpg",
  },
  {
    id: 15,
    name: "Mint",
    price: 5,
    image: "https://www.ugaoo.com/cdn/shop/articles/82b18b332c.jpg?v=1724319641",
  },
  {
    id: 16,
    name: "Euphorbia",
    price: 22,
    image: "https://plnts-api.ams3.digitaloceanspaces.com/main/8538b10a7c3b2389a0a58c952a08cc36.jpg",
  },
  {
    id: 17,
    name: "Jade Plant",
    price: 25,
    image: "https://plantura.garden/uk/wp-content/uploads/sites/2/2022/05/jade-plant-care-1024x683.jpg?x63657",
  },
  {
    id: 18,
    name: "Pothos",
    price: 12,
    image: "https://costafarms.com/cdn/shop/articles/Golden_Pothos_Houseplant_Header-Costa_Farms.jpg?v=1726236093",
  },
  {
    id: 19,
    name: "Calathea",
    price: 18,
    image: "https://hips.hearstapps.com/hmg-prod/images/calathea-ornata-1644355236.jpg?crop=1xw:0.5624062031015508xh;center,top&resize=1200:*",
  },
  {
    id: 20,
    name: "Boston Fern",
    price: 14,
    image: "https://www.beardsanddaisies.co.uk/cdn/shop/products/BD_H_M_Plants_039_720x.jpg?v=1696004026",
  },
  // Add other plants similarly
];


  const addToCart = (plant) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === plant.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === plant.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...plant, quantity: 1 }];
    });
    setTotalPrice((prevTotal) => prevTotal + plant.price);
  };

  return (
    <div className='p-6 min-h-screen bg-gray-100'>
          <nav className='bg-green-900 -m-8 pt-8 text-white'>
            <div className='container mx-auto px-4 py-3 flex justify-between items-center'>
              <h1 className='text-xl font-bold'>
                <Link to='/h'>Plant Care</Link>
              </h1>
              <div className='flex space-x-4'>
                <Link to='/home' className='hover:underline'>
                  Home
                </Link>
                <Link to='/research-work' className='hover:underline'>
                  Research
                </Link>
                <Link to='/video-tutorials' className='hover:underline'>
                  Tutorials
                </Link>
                <Link to='/plants' className='hover:underline'>
                  Plants
                </Link>
                <Link to='/marketplace' className='hover:underline'>
                  MarketplacePage
                </Link>
                <Link to='/profile' className='hover:underline'>
                  User
                </Link>
                <Link to='/session' className='hover:underline'>
                  Session
                </Link>
                <Link to='/' className='hover:underline'>
                  logout
                </Link>
                {/* add notifiaction bell  */}
    
                <Link to='/notification' className='hover:underline'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 17h5l-1.405-1.405A2.002 2.002 0 0018 13V8a6 6 0 00-12 0v5a2.002 2.002 0 00-.595 1.595L5 17h5m7 0a3 3 0 11-6 0'
                    />
                  </svg>
                </Link>
    
              </div>
            </div>
          </nav>
      <div className="flex min-h-screen mt-16 bg-green-50">
        {/* Marketplace */}
        <div className="flex-1 p-6">
          <h2 className="text-2xl font-bold text-green-800 text-center">Marketplace</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {plants.map((plant) => (
              <div key={plant.id} className="border border-green-300 rounded-md p-4 text-center">
                <img src={plant.image} alt={plant.name} className="w-24 h-24 mx-auto" />
                <h3 className="mt-2 font-semibold text-green-800">{plant.name}</h3>
                <p className="text-green-700">৳{plant.price}</p>
                <button
                  onClick={() => addToCart(plant)}
                  className="mt-2 bg-green-600 text-white py-1 px-4 rounded hover:bg-green-700 transition"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>


        {/* Quiz Section */}
        <div className="w-1/3 bg-white shadow-lg p-6">
          <h2 className="text-xl font-bold text-green-800 mb-1">Not sure which plant to buy?</h2>
          <p className="text-green-700 mb-1">Take a quick quiz to find the perfect plant for you!</p>
          <Link
            to="/which-plant-quiz"
            className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition"
          >
            Take the Quiz
          </Link>
        </div>




        {/* Cart Summary */}
        <div className="w-1/3 bg-white shadow-lg p-6">
          <h3 className="text-xl font-bold text-green-800 mb-4">Cart Summary</h3>
          {cart.length > 0 ? (
            <div>
              <ul className="space-y-2">
                {cart.map((item) => (
                  <li key={item.id} className="flex justify-between items-center text-green-700">
                    <span>
                      {item.name} <strong>× {item.quantity}</strong>
                    </span>
                    <span>${item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 font-bold text-green-800">Total: ৳{totalPrice}</p>
              
              <h1>
                <Link
                  to="/transaction"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Checkout
                </Link>
              </h1>
                
              
            </div>
          ) : (
            <p className="text-green-700">Your cart is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;