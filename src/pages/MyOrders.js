import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [searched, setSearched] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem('clientToken');

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(
                `http://localhost:8080/orders/my-orders?email=${email}&page=0&size=10`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setOrders(res.data.content);
            setSearched(true);
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">📦 Lịch sử đơn hàng</h2>

            {/* Tìm theo email */}
            <div className="bg-white rounded-2xl shadow p-6 mb-6">
                <form onSubmit={handleSearch} className="flex gap-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Nhập email đã đặt hàng..."
                        className="flex-1 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium">
                        🔍 Tìm kiếm
                    </button>
                </form>
            </div>

            {/* Danh sách đơn hàng */}
            {searched && (
                orders.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">
                        Không tìm thấy đơn hàng nào!
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map(order => (
                            <div key={order.id} className="bg-white rounded-2xl shadow p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <p className="text-gray-500 text-sm">Mã đơn hàng</p>
                                        <p className="font-bold text-lg">#{order.id}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">Ngày đặt</p>
                                        <p className="font-medium">
                                            {new Date(order.orderDate).toLocaleDateString('vi-VN')}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">Tổng tiền</p>
                                        <p className="font-bold text-blue-600 text-lg">
                                            {order.totalAmount?.toLocaleString('vi-VN')}đ
                                        </p>
                                    </div>
                                    <div>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium
                                            ${order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                                            order.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                                            'bg-red-100 text-red-700'}`}>
                                            {order.status === 'PENDING' ? '⏳ Đang xử lý' :
                                             order.status === 'COMPLETED' ? '✅ Hoàn thành' :
                                             '❌ Đã hủy'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            )}
        </div>
    );
};

export default MyOrders;