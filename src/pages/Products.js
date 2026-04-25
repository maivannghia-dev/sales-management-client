import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const { addToCart } = useCart();
    const pageSize = 9;

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async (page = 0) => {
        const res = await axios.get(
            `http://localhost:8080/products?page=${page}&size=${pageSize}`
        );
        setProducts(res.data.content);
        setTotalPages(res.data.totalPages);
        setCurrentPage(page);
        setLoading(false);
    };

    const fetchCategories = async () => {
        const res = await axios.get('http://localhost:8080/categories?page=0&size=100');
        setCategories(res.data.content);
    };

    const handleSearch = async (e) => {
        const value = e.target.value;
        setSearch(value);
        if (value) {
            const res = await axios.get(
                `http://localhost:8080/products/search?name=${value}&page=0&size=${pageSize}`
            );
            setProducts(res.data.content);
            setTotalPages(res.data.totalPages);
        } else {
            fetchProducts();
        }
    };

    if (loading) return <div className="text-center mt-20">Đang tải...</div>;

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">🛍️ Tất cả sản phẩm</h2>

            {/* Search và Filter */}
            <div className="flex gap-4 mb-8">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder="🔍 Tìm kiếm sản phẩm..."
                    className="flex-1 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-48">
                    <option value="">Tất cả danh mục</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </div>

            {/* Danh sách sản phẩm */}
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

            {/* Phân trang */}
            <div className="flex justify-center items-center gap-2 mt-8">
                <button
                    onClick={() => fetchProducts(currentPage - 1)}
                    disabled={currentPage === 0}
                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50">
                    ← Trước
                </button>
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => fetchProducts(i)}
                        className={`px-4 py-2 rounded-lg font-medium
                            ${currentPage === i
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 hover:bg-gray-300'}`}>
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={() => fetchProducts(currentPage + 1)}
                    disabled={currentPage === totalPages - 1}
                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50">
                    Sau →
                </button>
            </div>
        </div>
    );
};

export default Products;