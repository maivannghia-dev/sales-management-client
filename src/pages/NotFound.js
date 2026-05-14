import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
            <p className="text-9xl font-bold text-blue-600 mb-4">404</p>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Trang không tồn tại!</h2>
            <p className="text-gray-500 mb-8">Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
            <Link to="/"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium">
                🏠 Về trang chủ
            </Link>
        </div>
    );
};

export default NotFound;