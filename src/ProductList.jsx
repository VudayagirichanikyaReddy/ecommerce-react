import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useStore } from "./ProductContext";
import allProducts from "./products.json";

// Star rating display helper
function Stars({ rating }) {
  return (
    <span className="stars">
      {"★".repeat(Math.floor(rating))}
      {"☆".repeat(5 - Math.floor(rating))}
      <span className="rating-num">{rating}</span>
    </span>
  );
}

function ProductList() {
  const { addToCart, cartCount } = useStore();

  // useRef — to access the search input DOM element directly
  const searchRef = useRef(null);

  // useState — controlled filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [addedId, setAddedId] = useState(null); // for button feedback

  // Get unique categories from product data
  const categories = ["All", ...new Set(allProducts.map((p) => p.category))];

  // Filter logic — applies both search and category filter
  const filtered = allProducts.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Clear search using useRef (focuses the input after clearing)
  function handleClearSearch() {
    setSearchTerm("");
    searchRef.current.focus(); // useRef in action — direct DOM access
  }

  // Add to cart with brief visual feedback
  function handleAddToCart(product) {
    addToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  }

  return (
    <div className="page product-list-page">
      {/* ── Search & Filter Bar ── */}
      <div className="search-filter-bar">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            ref={searchRef}               // useRef attached here
            type="text"
            placeholder="Search products…"
            value={searchTerm}            // controlled input via useState
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button className="clear-btn" onClick={handleClearSearch}>✕</button>
          )}
        </div>

        <div className="category-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Results count ── */}
      <p className="results-count">
        {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
        {selectedCategory !== "All" && ` in ${selectedCategory}`}
      </p>

      {/* ── Product Grid ── */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <p>No products match your search.</p>
          <button onClick={handleClearSearch}>Clear search</button>
        </div>
      ) : (
        <div className="product-grid">
          {filtered.map((product) => (
            <div key={product.id} className="product-card">
              <Link to={`/product/${product.id}`}>
                <img src={product.image} alt={product.name} className="product-img" />
              </Link>
              <div className="card-body">
                <span className="category-tag">{product.category}</span>
                <Link to={`/product/${product.id}`} className="product-name">
                  {product.name}
                </Link>
                <Stars rating={product.rating} />
                <div className="card-footer">
                  <span className="price">${product.price}</span>
                  <button
                    className={`add-btn ${addedId === product.id ? "added" : ""}`}
                    onClick={() => handleAddToCart(product)}
                  >
                    {addedId === product.id ? "✓ Added" : "+ Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
