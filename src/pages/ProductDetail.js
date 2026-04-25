import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    useEffect(() => {
        axios.get(`http://localhost:8080/products/${id}`)
            .then(res => {
                setProduct(res.data);
                setLoading(false);
            });
    }, [id]);

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        toast.success('Đã thêm vào giỏ hàng! 🛍️');
    };

    if (loading) return <div className="text-center mt-20">Đang tải...</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <button
                onClick={() => navigate(-1)}
                className="text-blue-600 hover:text-blue-700 mb-6 flex items-center gap-2">
                ← Quay lại
            </button>

            <div className="bg-white rounded-2xl shadow p-8 flex gap-8">
                {/* Ảnh sản phẩm */}
                <div className="bg-gray-100 rounded-xl w-80 h-80 flex items-center justify-center text-8xl flex-shrink-0">
                    🛍️
                </div>

                {/* Thông tin */}
                <div className="flex-1">
                    <p className="text-blue-600 text-sm font-medium mb-2">
                        {product.category ? product.category.name : 'Chưa phân loại'}
                    </p>
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
                    <p className="text-gray-500 mb-6">{product.description || 'Không có mô tả'}</p>
                    <p className="text-4xl font-bold text-blue-600 mb-6">
                        {product.price.toLocaleString('vi-VN')}đ
                    </p>

                    <p className="text-gray-500 mb-4">
                        Còn lại: <span className="font-bold text-gray-800">{product.quantity}</span> sản phẩm
                    </p>

                    {/* Số lượng */}
                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-gray-700 font-medium">Số lượng:</span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full font-bold">
                                -
                            </button>
                            <span className="w-8 text-center font-bold">{quantity}</span>
                            <button
                                onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                                className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full font-bold">
                                +
                            </button>
                        </div>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-lg">
                        🛍️ Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;