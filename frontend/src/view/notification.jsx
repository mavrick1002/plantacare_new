//src--> view-->notification.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Notification = () => {
    // Initial notifications (can be empty or your static ones)
    const [notifications, setNotifications] = useState([
        // ...existing static notifications if needed
    ]);

    useEffect(() => {
        // Simulate a notification after 2 minutes (120000 ms)
        const timer = setTimeout(() => {
            setNotifications((prev) => [
                ...prev,
                {
                    image: 'https://via.placeholder.com/150',
                    title: 'Water & Fertilizer Reminder',
                    message: `Posted by Admin. Water your plant at 10:00 AM and fertilize at 6:00 PM.`,
                    postedBy: 'Admin',
                    waterTime: '10:00 AM',
                    fertilizerTime: '6:00 PM',
                    postedAt: new Date().toLocaleTimeString(),
                },
            ]);
        }, 120000); // 2 minutes

        return () => clearTimeout(timer);
    }, []);

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

            <h1 className='text-3xl font-bold text-green-800 text-center mb-8 mt-16'>
                Notifications
            </h1>
            <p className='text-lg text-green-700 text-center mb-8'>
                Stay updated with the latest news and updates from Plant Care.
            </p>
            <div className='notification-list max-w-4xl mx-auto'>
                {notifications.length === 0 && (
                    <p className="text-center text-gray-500">No notifications yet. Please wait...</p>
                )}
                {notifications.map((notification, index) => (
                    <div
                        key={index}
                        className='notification-card bg-white p-6 rounded-lg shadow-md mb-6 flex items-center hover:bg-green-100 transition'
                    >
                        <img
                            src={notification.image}
                            alt={`${notification.title}`}
                            className='w-24 h-24 rounded-full object-cover mr-6'
                        />
                        <div>
                            <h2 className='text-xl font-semibold text-green-800 mb-2'>
                                {notification.title}
                            </h2>
                            <p className='text-gray-700 mb-1'>{notification.message}</p>
                            {notification.postedBy && (
                                <p className='text-sm text-gray-500'>
                                    Posted by: {notification.postedBy} | Water: {notification.waterTime} | Fertilizer: {notification.fertilizerTime} | At: {notification.postedAt}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notification;