import { Link } from "react-router-dom";
import { useStore } from "./ProductContext";

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    cartTotal,
    cartCount
  } = useStore();

  if (cart.length === 0) {
    return (
      <div className="page cart-page">
        <h1 className="page-title">Your Cart</h1>
        <div className="empty-state">
          <span className="empty-icon">🛒</span>
          <p>Your cart is empty.</p>
          <Link to="/" className="shop-link">
            Start Shopping →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page cart-page">
      <h1 className="page-title">
        Your Cart <span className="cart-count-badge">{cartCount()}</span>
      </h1>

      <div className="cart-layout">
        {/* ── Cart Items ── */}
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-img" />

              <div className="cart-item-info">
                <Link to={`/product/${item.id}`} className="cart-item-name">
                  {item.name}
                </Link>

                <span className="cart-item-cat">{item.category}</span>

                {/* Quantity Controls */}
                <div className="qty-controls">
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>

                <div className="cart-item-row">
                  <span className="cart-item-price">
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* ── Order Summary ── */}
        <div className="order-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Items ({cartCount()})</span>
            <span>${cartTotal().toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span className="free-tag">Free</span>
          </div>

          <div className="summary-divider" />

          <div className="summary-row total-row">
            <span>Total</span>
            <span>${cartTotal().toFixed(2)}</span>
          </div>

          <Link to="/checkout" className="checkout-btn">
            Proceed to Checkout
          </Link>

          <Link to="/" className="continue-link">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;