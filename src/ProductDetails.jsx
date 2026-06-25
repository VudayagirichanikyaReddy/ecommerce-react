import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useStore } from "./ProductContext";
import allProducts from "./products.json";

function ProductDetails() {
  const { id } = useParams();          // Dynamic Route: /product/:id
  const navigate = useNavigate();
  const { addToCart } = useStore();
  const [added, setAdded] = useState(false);

  // Find the product by matching the URL param
  const product = allProducts.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="page not-found">
        <h2>Product not found</h2>
        <Link to="/">← Back to Shop</Link>
      </div>
    );
  }

  function handleAddToCart() {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  // Build star string
  const stars = "★".repeat(Math.floor(product.rating)) + "☆".repeat(5 - Math.floor(product.rating));

  return (
    <div className="page detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

      <div className="detail-card">
        <div className="detail-img-wrap">
          <img src={product.image} alt={product.name} className="detail-img" />
        </div>

        <div className="detail-info">
          <span className="category-tag">{product.category}</span>
          <h1 className="detail-title">{product.name}</h1>

          <div className="detail-rating">
            <span className="stars">{stars}</span>
            <span className="rating-num">{product.rating} / 5</span>
          </div>

          <p className="detail-price">${product.price}</p>
          <p className="detail-desc">{product.description}</p>

          <button
            className={`add-btn big ${added ? "added" : ""}`}
            onClick={handleAddToCart}
          >
            {added ? "✓ Added to Cart!" : "Add to Cart"}
          </button>

          <Link to="/cart" className="view-cart-link">View Cart →</Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
