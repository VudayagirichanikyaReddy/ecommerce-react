import { useStore } from "./ProductContext";
import { Link } from "react-router-dom";

function Checkout() {
  const { cart, cartTotal } = useStore();

  return (
    <div className="page">
      <h1>Checkout</h1>

      {cart.map(item => (
        <div key={item.id}>
          {item.name} × {item.qty}
        </div>
      ))}

      <h2>Total: ${cartTotal().toFixed(2)}</h2>

      <button onClick={() => alert("Order Placed!")}>
        Place Order
      </button>

      <Link to="/">Back to Shop</Link>
    </div>
  );
}

export default Checkout;