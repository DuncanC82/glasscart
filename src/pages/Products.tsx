import React, { useEffect, useState } from 'react';

interface Product {
    _id: string;
    distributor_id: string;
    name: string;
    description?: string;
    price: number;
    image_url?: string;
    stock_quantity: number;
    is_active?: boolean;
    created_at?: string;
}

const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch products');
                return res.json();
            })
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center mt-8">Loading products...</div>;
    if (error) return <div className="text-center mt-8 text-red-600">{error}</div>;

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Products</h1>
            <div className="flex flex-wrap gap-6">
                {products.map(product => (
                    <div key={product._id} className="border rounded-lg p-4 w-56 bg-white shadow">
                        <img src={product.image_url || 'https://via.placeholder.com/120x120?text=No+Image'} alt={product.name} className="w-28 h-28 object-cover rounded mx-auto" />
                        <h2 className="text-lg font-semibold mt-2 mb-1">{product.name}</h2>
                        <p className="text-gray-600 text-sm mb-1">{product.description}</p>
                        <div className="font-bold mb-1">${product.price.toFixed(2)}</div>
                        <div className="text-xs text-gray-500 mb-2">In stock: {product.stock_quantity}</div>
                        <button className="bg-cyan-500 hover:bg-cyan-600 text-white rounded px-3 py-1 w-full mt-2">Buy Now</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;