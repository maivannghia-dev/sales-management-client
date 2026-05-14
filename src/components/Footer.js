import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-blue-800 text-white mt-16">
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid grid-cols-3 gap-8">
                    {/* Logo và mô tả */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4">🛒 Sales Shop</h3>
                        <p className="text-blue-200">
                            Mua sắm dễ dàng, giá cả hợp lý. Chúng tôi cam kết mang đến trải nghiệm mua sắm tốt nhất cho bạn.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Liên kết</h4>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-blue-200 hover:text-white">Trang chủ</Link></li>
                            <li><Link to="/products" className="text-blue-200 hover:text-white">Sản phẩm</Link></li>
                            <li><Link to="/cart" className="text-blue-200 hover:text-white">Giỏ hàng</Link></li>
                            <li><Link to="/my-orders" className="text-blue-200 hover:text-white">Đơn hàng của tôi</Link></li>
                        </ul>
                    </div>

                    {/* Liên hệ */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Liên hệ</h4>
                        <ul className="space-y-2 text-blue-200">
                            <li>📧 maivannghia808@gmail.com</li>
                            <li>📞 0349270969</li>
                            <li>📍 Phú Đa, Phú Vang, TP Huế</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-blue-700 mt-8 pt-8 text-center text-blue-200">
                    <p>© 2026 Sales Shop. All rights reserved. Made by Mai Văn Nghĩa</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;