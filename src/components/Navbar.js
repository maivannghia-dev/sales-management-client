import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { totalItems } = useCart();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    useEffect(() => {
        const checkLogin = () => {
            const token = localStorage.getItem('clientToken');
            if (token) {
                axios.get('http://localhost:8080/auth/me', {
                    headers: { Authorization: `Bearer ${token}` }
                }).then(res => setUsername(res.data.username))
                    .catch(() => {
                        localStorage.removeItem('clientToken');
                        setUsername('');
                    });
            } else {
                setUsername('');
            }
        };

        checkLogin();
        window.addEventListener('loginStateChanged', checkLogin);
        return () => window.removeEventListener('loginStateChanged', checkLogin);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('clientToken');
        setUsername('');
        toast.success('Đăng xuất thành công!');
        navigate('/');
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-blue-600">
                    🛒 Sales Shop
                </Link>

                <div className="flex items-center gap-6">
                    <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium">
                        Trang chủ
                    </Link>
                    <Link to="/products" className="text-gray-600 hover:text-blue-600 font-medium">
                        Sản phẩm
                    </Link>
                    <Link to="/cart" className="relative text-gray-600 hover:text-blue-600 font-medium">
                        🛍️ Giỏ hàng
                        {totalItems > 0 && (
                            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {totalItems}
                            </span>
                        )}
                    </Link>
                    <Link to="/my-orders" className="text-gray-600 hover:text-blue-600 font-medium">
                        📦 Đơn hàng của tôi
                    </Link>
                    {username ? (
                        <div className="flex items-center gap-3">
                            <span className="text-gray-700 font-medium">👋 {username}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium">
                                Đăng xuất
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
                            Đăng nhập
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;