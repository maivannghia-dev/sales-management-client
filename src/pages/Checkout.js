import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const Checkout = () => {
    const { cart, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [ordered, setOrdered] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!form.name) newErrors.name = 'Vui lòng nhập họ tên';
        if (!form.email) newErrors.email = 'Vui lòng nhập email';
        if (!form.phone) newErrors.phone = 'Vui lòng nhập số điện thoại';
        if (!form.address) newErrors.address = 'Vui lòng nhập địa chỉ';
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        try {

            const token = localStorage.getItem('clientToken');
            const headers = { Authorization: `Bearer ${token}` };

            // Tạo khách hàng mới
            const customerRes = await axios.post('http://localhost:8080/customers', form, { headers });
            const customer = customerRes.data;

            // Tạo đơn hàng
            const orderData = {
                customer: { id: customer.id },
                orderDate: new Date().toISOString(),
                status: 'PENDING',
                orderDetails: cart.map(item => ({
                    product: { id: item.id },
                    quantity: item.quantity,
                    price: item.price
                }))
            };

            await axios.post('http://localhost:8080/orders', orderData, { headers });

            clearCart();
            setOrdered(true);
            toast.success('Đặt hàng thành công! 🎉');
            navigate('/order-success');
        } catch (err) {
            toast.error('Có lỗi xảy ra, vui lòng thử lại!');
        }
        setLoading(false);
    };

    useEffect(() => {
        if (cart.length === 0 && !ordered) {
            navigate('/cart');
        }
    }, [cart, ordered]);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">📦 Đặt hàng</h2>

            <div className="grid grid-cols-2 gap-8">
                {/* Form thông tin */}
                <div className="bg-white rounded-2xl shadow p-6">
                    <h3 className="text-xl font-bold mb-6">Thông tin giao hàng</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1">Họ tên</label>
                            <input
                                type="text"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập họ tên"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập email"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1">Số điện thoại</label>
                            <input
                                type="text"
                                value={form.phone}
                                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập số điện thoại"
                            />
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 mb-1">Địa chỉ</label>
                            <input
                                type="text"
                                value={form.address}
                                onChange={(e) => setForm({ ...form, address: e.target.value })}
                                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Nhập địa chỉ giao hàng"
                            />
                            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold text-lg disabled:opacity-50">
                            {loading ? 'Đang xử lý...' : '✅ Xác nhận đặt hàng'}
                        </button>
                    </form>
                </div>

                {/* Tóm tắt đơn hàng */}
                <div className="bg-white rounded-2xl shadow p-6 h-fit">
                    <h3 className="text-xl font-bold mb-6">Tóm tắt đơn hàng</h3>
                    {cart.map(item => (
                        <div key={item.id} className="flex justify-between mb-3">
                            <span className="text-gray-700">{item.name} × {item.quantity}</span>
                            <span className="font-medium">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</span>
                        </div>
                    ))}
                    <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between">
                            <span className="font-bold text-lg">Tổng tiền:</span>
                            <span className="font-bold text-xl text-blue-600">
                                {totalPrice.toLocaleString('vi-VN')}đ
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;