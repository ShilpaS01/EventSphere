
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import events from "../data/events";
import { useApp } from "../context/AppContext";

import "./ExploreEvents.css";

function ExploreEvents() {
  const navigate = useNavigate();

  const {
    wishlist,
    toggleWishlist,
    addToCart
  } = useApp();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Birthday",
    "Wedding",
    "Concert",
    "Festival",
    "Corporate",
    "Baby Shower"
  ];

  // Search and filter events
  const filteredEvents = events.filter((event) => {

    const searchText = search
      .toLowerCase()
      .replace(/[\s-]/g, "");

    const title = event.title.toLowerCase().replace(/[\s-]/g, "");
    const category = event.category.toLowerCase().replace(/[\s-]/g, "");
    const location = event.location.toLowerCase().replace(/[\s-]/g, "");

    const matchesSearch =
      title.includes(searchText) ||
      category.includes(searchText) ||
      location.includes(searchText);

    const matchesCategory =
      selectedCategory === "All" ||
      event.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="explore-page">

      {/* HEADER */}

      <div className="explore-header">
        <h1>Explore Beautiful Events</h1>

        <p>
          Discover amazing events and make your special
          moments unforgettable.
        </p>
      </div>

      {/* SEARCH */}

      <div className="explore-search">
        <input
          type="text"
          placeholder="Search birthday, wedding, festival..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* CATEGORY FILTER */}

      <div className="category-buttons">

        {categories.map((category) => (

          <button
            key={category}
            className={
              selectedCategory === category
                ? "category-active"
                : ""
            }
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>

        ))}

      </div>

      {/* EVENT CARDS */}

      <div className="event-grid">

        {filteredEvents.length > 0 ? (

          filteredEvents.map((event) => {

            const isWishlisted = wishlist.some(
              (item) => item.id === event.id
            );

            return (

              <div className="event-card" key={event.id}>

                {/* IMAGE */}

                <div className="event-image-container">

                  <img
                    src={event.image}
                    alt={event.title}
                    className="event-image"
                  />

                  {/* WISHLIST ICON */}

                  <button
                    type="button"
                    className="event-heart-button"
                    onClick={() => toggleWishlist(event)}
                    title="Add to Wishlist"
                  >
                    {isWishlisted ? "❤️" : "🤍"}
                  </button>

                  <span className="event-category">
                    {event.category}
                  </span>

                </div>

                {/* EVENT DETAILS */}

                <div className="event-content">

                  <h3>{event.title}</h3>

                  <p>📍 {event.location}</p>

                  <p>📅 {event.date}</p>

                  <p className="event-description">
                    {event.description}
                  </p>

                  <h3 className="event-price">
                    ₹{Number(event.price).toLocaleString("en-IN")}
                  </h3>

                  {/* ACTION BUTTONS */}

                  <div className="event-actions">

                    <button
                      type="button"
                      className="wishlist-button"
                      onClick={() => toggleWishlist(event)}
                    >
                      {isWishlisted ? "❤️ Saved" : "🤍 Wishlist"}
                    </button>

                    <button
                      type="button"
                      className="cart-button"
                      onClick={() => addToCart(event)}
                    >
                      🛒 Add to Cart
                    </button>

                    <button
                      type="button"
                      className="details-button"
                      onClick={() => navigate(`/event/${event.id}`)}
                    >
                      View Details
                    </button>

                  </div>

                </div>

              </div>

            );

          })

        ) : (

          <div className="no-events">

            <h2>No Events Found!</h2>

            <p>
              Please try another event name or category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
            >
              Clear Filters
            </button>

          </div>

        )}

      </div>

    </div>
  );
}

export default ExploreEvents;
