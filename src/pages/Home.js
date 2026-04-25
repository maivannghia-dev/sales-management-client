import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        axios.get('http://localhost:8080/products?page=0&size=6')
            .then(res => {
                setProducts(res.data.content);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            {/* Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold mb-4">Chào mừng đến với Sales Shop! 🛒</h1>
                    <p className="text-xl text-blue-100 mb-8">Mua sắm dễ dàng, giá cả hợp lý</p>
                    <Link to="/products"
                        className="bg-white text-blue-600 font-bold px-8 py-3 rounded-full hover:bg-blue-50 transition">
                        Xem tất cả sản phẩm →
                    </Link>
                </div>
            </div>

            {/* Sản phẩm nổi bật */}
            <div className="max-w-6xl mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">🌟 Sản phẩm nổi bật</h2>

                {loading ? (
                    <div className="text-center">Đang tải...</div>
                ) : (
                    <div className="grid grid-cols-3 gap-6">
                        {products.map(product => (
                            <div key={product.id} className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6">
                                <div className="bg-gray-100 rounded-xl h-48 flex items-center justify-center mb-4 text-6xl">
                                    🛍️
                                </div>
                                <h3 className="font-bold text-gray-800 text-lg mb-1">{product.name}</h3>
                                <p className="text-gray-500 text-sm mb-3">{product.description || 'Không có mô tả'}</p>
                                <p className="text-blue-600 font-bold text-xl mb-4">
                                    {product.price.toLocaleString('vi-VN')}đ
                                </p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            addToCart(product);
                                            toast.success('Đã thêm vào giỏ hàng! 🛍️');
                                        }}
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium">
                                        Thêm vào giỏ
                                    </button>
                                    <Link
                                        to={`/products/${product.id}`}
                                        className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
                                        Chi tiết
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;