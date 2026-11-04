
import { Link, useNavigate } from "react-router-dom";

import { useApp } from "../context/AppContext";

import "./Cart.css";

function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity
  } = useApp();

  const navigate = useNavigate();

  // Total number of items
  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // Calculate total amount
  const totalAmount = cart.reduce(
    (sum, item) =>
      sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="cart-page">

      {/* HEADER */}

      <div className="cart-header">

        <h1>🛒 My Shopping Cart</h1>

        <p>
          Review your selected events before booking.
        </p>

      </div>

      {/* EMPTY CART */}

      {cart.length === 0 ? (

        <div className="empty-cart">

          <div className="empty-cart-icon">
            🛒
          </div>

          <h2>Your Cart is Empty!</h2>

          <p>
            You haven't added any events to your cart yet.
          </p>

          <Link
            to="/explore"
            className="explore-cart-button"
          >
            Explore Events
          </Link>

        </div>

      ) : (

        <div className="cart-layout">

          {/* CART ITEMS */}

          <div className="cart-items">

            {cart.map((item) => (

              <div
                className="cart-item"
                key={item.id}
              >

                {/* EVENT IMAGE */}

                <img
                  src={item.image}
                  alt={item.title}
                  className="cart-item-image"
                />

                {/* EVENT INFORMATION */}

                <div className="cart-item-info">

                  <h3>{item.title}</h3>

                  <p>📍 {item.location}</p>

                  <p>📅 {item.date}</p>

                  <p>
                    Category: {item.category}
                  </p>

                  <h3 className="cart-price">
                    ₹{Number(item.price).toLocaleString("en-IN")}
                  </h3>

                  {/* QUANTITY */}

                  <div className="quantity-control">

                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.quantity - 1
                        )
                      }
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </button>

                  </div>

                  {/* ACTION BUTTONS */}

                  <div className="cart-item-actions">

                    <button
                      type="button"
                      className="remove-cart-button"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>

                    <button
                      type="button"
                      className="book-cart-button"
                      onClick={() =>
                        navigate(`/event/${item.id}`)
                      }
                    >
                      Book This Event
                    </button>

                  </div>

                </div>

                {/* SUBTOTAL */}

                <div className="cart-item-subtotal">

                  <p>Subtotal</p>

                  <h3>
                    ₹{(
                      Number(item.price) * item.quantity
                    ).toLocaleString("en-IN")}
                  </h3>

                </div>

              </div>

            ))}

          </div>

          {/* CART SUMMARY */}

          <div className="cart-summary">

            <h2>Cart Summary</h2>

            <div className="summary-row">

              <span>Total Event Items</span>

              <span>{totalItems}</span>

            </div>

            <div className="summary-row">

              <span>Unique Events</span>

              <span>{cart.length}</span>

            </div>

            <hr />

            <div className="summary-total">

              <span>Total Amount</span>

              <h2>
                ₹{totalAmount.toLocaleString("en-IN")}
              </h2>

            </div>

            <button
              type="button"
              className="checkout-button"
              onClick={() =>
                navigate(`/event/${cart[0].id}`)
              }
            >
              Continue to Booking
            </button>

            <Link
              to="/explore"
              className="continue-shopping"
            >
              Continue Shopping
            </Link>

          </div>

        </div>

      )}

    </div>
  );
}

export default Cart;
