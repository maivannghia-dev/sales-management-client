import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
    const [form, setForm] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const redirect = params.get('redirect') || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!form.username) newErrors.username = 'Vui lòng nhập username';
        if (!form.password) newErrors.password = 'Vui lòng nhập password';
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const res = await axios.post('http://localhost:8080/auth/login', form);
            localStorage.setItem('clientToken', res.data.token);
            window.dispatchEvent(new Event('loginStateChanged'));
            toast.success('Đăng nhập thành công! 🎉');
            navigate(redirect);
        } catch (err) {
            toast.error('Sai username hoặc password!');
        }
    };

    return (
        <div className="max-w-md mx-auto px-4 py-20">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">🔐 Đăng nhập</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-1">Username</label>
                        <input
                            type="text"
                            value={form.username}
                            onChange={(e) => setForm({ ...form, username: e.target.value })}
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nhập username"
                        />
                        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Nhập password"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold">
                        Đăng nhập
                    </button>
                </form>

                <p className="text-center text-gray-500 mt-6">
                    Chưa có tài khoản?{' '}
                    <Link to="/register" className="text-blue-600 hover:underline font-medium">
                        Đăng ký ngay
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;