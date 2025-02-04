import React, { useEffect, useState } from 'react';

interface CartProduct {
  productId: number;
  quantity: number;
}

interface Cart {
  id: number;
  userId: number;
  date: string;
  products: CartProduct[];
}

interface Product {
  id: number;
  title: string;
}

const Cart: React.FC = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    setProducts(storedProducts);

    fetch('https://fakestoreapi.com/carts')
      .then((res) => res.json())
      .then((json: Cart[]) => setCarts(json))
      .catch((error) => console.error('Error fetching cart data:', error));
  }, []);

  const getProductName = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    return product ? product.title : 'Unknown Product';
  };

  return (
    <div>
      <h1 className="text-center mb-4">Cart</h1>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Cart ID</th>
            <th>User ID</th>
            <th>Date</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {carts.map((cart) => (
            <tr key={cart.id}>
              <td>{cart.id}</td>
              <td>{cart.userId}</td>
              <td>{cart.date}</td>
              <td>
                <ul>
                  {cart.products.map((cartProduct) => (
                    <li key={cartProduct.productId}>
                      {getProductName(cartProduct.productId)} (Quantity: {cartProduct.quantity})
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cart;