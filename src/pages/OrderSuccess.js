import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
    return (
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
            <p className="text-8xl mb-6">🎉</p>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Đặt hàng thành công!</h2>
            <p className="text-gray-500 mb-8">
                Cảm ơn bạn đã mua hàng! Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.
            </p>
            <div className="flex gap-4 justify-center">
                <Link to="/"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium">
                    🏠 Về trang chủ
                </Link>
                <Link to="/products"
                    className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium">
                    🛍️ Tiếp tục mua sắm
                </Link>
            </div>
        </div>
    );
};

export default OrderSuccess;