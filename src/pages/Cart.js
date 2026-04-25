import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        const token = localStorage.getItem('clientToken');
        if (!token) {
            toast.error('Vui lòng đăng nhập để đặt hàng!');
            navigate('/login?redirect=/checkout');
        } else {
            navigate('/checkout');
        }
    };

    if (cart.length === 0) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-20 text-center">
                <p className="text-6xl mb-4">🛒</p>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Giỏ hàng trống!</h2>
                <Link to="/products"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium">
                    Tiếp tục mua sắm
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">🛒 Giỏ hàng</h2>

            <div className="bg-white rounded-2xl shadow overflow-hidden mb-6">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-4 text-left text-gray-600">Sản phẩm</th>
                            <th className="px-6 py-4 text-left text-gray-600">Giá</th>
                            <th className="px-6 py-4 text-left text-gray-600">Số lượng</th>
                            <th className="px-6 py-4 text-left text-gray-600">Thành tiền</th>
                            <th className="px-6 py-4 text-left text-gray-600"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, index) => (
                            <tr key={item.id}
                                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <span className="text-3xl">🛍️</span>
                                        <span className="font-medium">{item.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-blue-600 font-medium">
                                    {item.price.toLocaleString('vi-VN')}đ
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full font-bold">
                                            -
                                        </button>
                                        <span className="w-8 text-center font-bold">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full font-bold">
                                            +
                                        </button>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-green-600 font-bold">
                                    {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-500 hover:text-red-700 font-medium">
                                        🗑️ Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Tổng tiền */}
            <div className="bg-white rounded-2xl shadow p-6 flex justify-between items-center">
                <div>
                    <p className="text-gray-500">Tổng tiền:</p>
                    <p className="text-3xl font-bold text-blue-600">
                        {totalPrice.toLocaleString('vi-VN')}đ
                    </p>
                </div>
                <div className="flex gap-3">
                    <Link to="/products"
                        className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium">
                        Tiếp tục mua
                    </Link>
                    <button
                        onClick={handleCheckout}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium">
                        Đặt hàng →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;