import React, { useState } from 'react';

const AddProduct: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = { id: Date.now(), title, price: parseFloat(price), category, description, image };

    const existingProducts = JSON.parse(localStorage.getItem('products') || '[]') as typeof newProduct[];
    existingProducts.push(newProduct);
    localStorage.setItem('products', JSON.stringify(existingProducts));

    setTitle('');
    setPrice('');
    setCategory('');
    setDescription('');
    setImage('');

    alert('Product added successfully!');
  };

  return (
    <div>
      <h1 className="text-center mb-4">Add New Product</h1>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="form-group">
          <label>Title</label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Category</label>
          <input type="text" className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input type="text" className="form-control" value={image} onChange={(e) => setImage(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;