
import { Link, useNavigate } from "react-router-dom";

import { useApp } from "../context/AppContext";

import "./Wishlist.css";

function Wishlist() {
  const {
    wishlist,
    toggleWishlist,
    addToCart
  } = useApp();

  const navigate = useNavigate();

  return (
    <div className="wishlist-page">

      {/* HEADER */}

      <div className="wishlist-header">
        <h1>❤️ My Wishlist</h1>

        <p>
          Your favourite events are saved here.
        </p>
      </div>

      {/* EMPTY WISHLIST */}

      {wishlist.length === 0 ? (

        <div className="empty-wishlist">

          <div className="empty-wishlist-icon">
            🤍
          </div>

          <h2>Your Wishlist is Empty!</h2>

          <p>
            You haven't saved any events yet.
            Explore events and add your favourites.
          </p>

          <Link
            to="/explore"
            className="explore-wishlist-button"
          >
            Explore Events
          </Link>

        </div>

      ) : (

        /* SAVED EVENTS */

        <div className="wishlist-grid">

          {wishlist.map((event) => (

            <div
              className="wishlist-card"
              key={event.id}
            >

              {/* EVENT IMAGE */}

              <div className="wishlist-image-container">

                <img
                  src={event.image}
                  alt={event.title}
                />

                <span className="wishlist-category">
                  {event.category}
                </span>

              </div>

              {/* EVENT INFORMATION */}

              <div className="wishlist-content">

                <h3>{event.title}</h3>

                <p>📍 {event.location}</p>

                <p>📅 {event.date}</p>

                <p className="wishlist-description">
                  {event.description}
                </p>

                <h3 className="wishlist-price">
                  ₹{Number(event.price).toLocaleString("en-IN")}
                </h3>

                {/* ACTION BUTTONS */}

                <div className="wishlist-actions">

                  <button
                    type="button"
                    className="wishlist-cart-button"
                    onClick={() => addToCart(event)}
                  >
                    🛒 Add to Cart
                  </button>

                  <button
                    type="button"
                    className="wishlist-remove-button"
                    onClick={() => toggleWishlist(event)}
                  >
                    Remove ❤️
                  </button>

                  <button
                    type="button"
                    className="wishlist-details-button"
                    onClick={() => navigate(`/event/${event.id}`)}
                  >
                    View Details
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

export default Wishlist;
