
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import events from "../data/events";
import { useApp } from "../context/AppContext";
import "./EventDetails.css";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { wishlist, toggleWishlist, addToCart } = useApp();

  const event = events.find(
    (item) => String(item.id) === String(id)
  );

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    guests: 1,
    eventDate: event?.date || "",
  });

  const [error, setError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(null);

  if (!event) {
    return (
      <div className="event-not-found">
        <h2>Event Not Found</h2>
        <button onClick={() => navigate("/explore")}>
          Back to Events
        </button>
      </div>
    );
  }

  const isWishlisted = wishlist.some(
    (item) => String(item.id) === String(event.id)
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBooking = (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.fullName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (Number(formData.guests) < 1) {
      setError("Please select at least one guest.");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(formData.eventDate + "T00:00:00");

    if (
      !formData.eventDate ||
      Number.isNaN(selectedDate.getTime()) ||
      selectedDate < today
    ) {
      setError("Please select today or a future event date.");
      return;
    }

    // Create booking with event image
    const newBooking = {
      id: Date.now(),

      bookingId: `ES${Math.floor(
        10000000 + Math.random() * 90000000
      )}`,

      eventId: event.id,
      title: event.title,

      // Important: Save the event image
      image: event.image,

      category: event.category,
      location: event.location,
      price: Number(event.price),

      fullName: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone.trim(),
      guests: Number(formData.guests),

      eventDate: formData.eventDate,
      bookingDate: new Date().toISOString(),
      status: "Confirmed",
    };

    try {
      const existingBookings = JSON.parse(
        localStorage.getItem("eventsphere_bookings") || "[]"
      );

      const updatedBookings = [
        ...existingBookings,
        newBooking,
      ];

      localStorage.setItem(
        "eventsphere_bookings",
        JSON.stringify(updatedBookings)
      );

      setBookingSuccess(newBooking);
    } catch (storageError) {
      console.error("Booking storage error:", storageError);
      setError("Unable to save booking. Please try again.");
    }
  };

  // Booking confirmation page
  if (bookingSuccess) {
    return (
      <div className="booking-success-page">
        <div className="booking-success-card">

          <div className="success-icon">✓</div>

          <h1>Booking Confirmed!</h1>

          <p>
            Your event booking has been saved successfully.
          </p>

          <div className="success-image-container">
            <img
              src={bookingSuccess.image}
              alt={bookingSuccess.title}
              className="success-event-image"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "https://placehold.co/600x400?text=Event+Image";
              }}
            />
          </div>

          <h2>{bookingSuccess.title}</h2>

          <div className="success-booking-details">
            <p>
              <strong>Booking ID:</strong>{" "}
              {bookingSuccess.bookingId}
            </p>

            <p>
              <strong>Name:</strong>{" "}
              {bookingSuccess.fullName}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {bookingSuccess.eventDate}
            </p>

            <p>
              <strong>Guests:</strong>{" "}
              {bookingSuccess.guests}
            </p>

            <p>
              <strong>Location:</strong>{" "}
              {bookingSuccess.location}
            </p>

            <p>
              <strong>Total Amount:</strong> ₹
              {(
                bookingSuccess.price * bookingSuccess.guests
              ).toLocaleString("en-IN")}
            </p>
          </div>

          <div className="success-actions">
            <button
              onClick={() => navigate("/my-bookings")}
            >
              View My Bookings
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/explore")}
            >
              Explore More Events
            </button>
          </div>

        </div>
      </div>
    );
  }

  // Event details and booking form
  return (
    <div className="event-details-page">
      <div className="event-details-container">

        {/* Event Information */}

        <div className="event-information">

          <img
            src={event.image}
            alt={event.title}
            className="event-details-image"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "https://placehold.co/800x500?text=Event+Image";
            }}
          />

          <div className="event-information-content">

            <span className="event-category">
              {event.category}
            </span>

            <h1>{event.title}</h1>

            <p className="event-description">
              {event.description}
            </p>

            <div className="event-meta">
              <p>
                <strong>Location:</strong> {event.location}
              </p>

              <p>
                <strong>Date:</strong> {event.date}
              </p>

              <p>
                <strong>Price:</strong> ₹
                {Number(event.price).toLocaleString("en-IN")}
              </p>
            </div>

            <div className="event-action-buttons">

              <button
                type="button"
                onClick={() => toggleWishlist(event)}
              >
                {isWishlisted
                  ? "❤️ Remove Wishlist"
                  : "🤍 Add to Wishlist"}
              </button>

              <button
                type="button"
                onClick={() => addToCart(event)}
              >
                🛒 Add to Cart
              </button>

            </div>
          </div>
        </div>

        {/* Booking Form */}

        <div className="booking-form-container">

          <h2>Book Your Event</h2>

          <p>
            Fill in your details to confirm your booking.
          </p>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleBooking}>

            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Mobile Number</label>

              <input
                type="tel"
                name="phone"
                placeholder="Enter 10-digit mobile number"
                value={formData.phone}
                onChange={handleChange}
                maxLength="10"
                required
              />
            </div>

            <div className="form-group">
              <label>Number of Guests</label>

              <input
                type="number"
                name="guests"
                min="1"
                value={formData.guests}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Event Date</label>

              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                min={new Date().toLocaleDateString("en-CA")}
                onChange={handleChange}
                required
              />
            </div>

            <div className="booking-price">
              <span>Price per guest</span>

              <strong>
                ₹{Number(event.price).toLocaleString("en-IN")}
              </strong>
            </div>

            <button
              type="submit"
              className="confirm-booking-btn"
            >
              Confirm Booking
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}

export default EventDetails;
