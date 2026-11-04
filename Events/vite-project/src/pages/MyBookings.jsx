
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import events from "../data/events";
import "./MyBookings.css";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    try {
      const savedBookings = JSON.parse(
        localStorage.getItem("eventsphere_bookings") || "[]"
      );
      setBookings(savedBookings);
    } catch (error) {
      console.error("Unable to load bookings:", error);
      setBookings([]);
    }
  }, []);

  const clearAllBookings = () => {
    if (window.confirm("Are you sure you want to remove all bookings?")) {
      localStorage.removeItem("eventsphere_bookings");
      setBookings([]);
    }
  };

  // Find the original event image if booking.image is missing
  const getEventImage = (booking) => {
    const originalEvent = events.find(
      (event) => String(event.id) === String(booking.eventId)
    );

    return booking.image || originalEvent?.image || "";
  };

  if (bookings.length === 0) {
    return (
      <div className="my-bookings-page">
        <div className="empty-bookings">
          <h2>No Bookings Found</h2>
          <p>You have not booked any events yet.</p>
          <Link to="/explore" className="explore-bookings-btn">
            Explore Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="my-bookings-page">
      <div className="bookings-header">
        <div>
          <h1>My Bookings</h1>
          <p>View and manage your event reservations.</p>
        </div>

        <button
          className="clear-bookings-btn"
          onClick={clearAllBookings}
        >
          Clear All Bookings
        </button>
      </div>

      <div className="bookings-grid">
        {bookings.map((booking) => (
          <div className="booking-card" key={booking.id}>
            <div className="booking-image-container">
              <img
                src={getEventImage(booking)}
                alt={booking.title || "Booked event"}
                className="booking-image"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    "https://placehold.co/600x400?text=Image+Unavailable";
                }}
              />

              <span className="booking-status">
                {booking.status || "Confirmed"}
              </span>
            </div>

            <div className="booking-content">
              <h2>{booking.title || booking.eventTitle || "Event"}</h2>

              <p className="booking-category">
                {booking.category || "Event"}
              </p>

              <div className="booking-details">
                <p><strong>Booking ID:</strong> {booking.bookingId || booking.id}</p>
                <p><strong>Name:</strong> {booking.fullName || booking.name || "N/A"}</p>
                <p><strong>Date:</strong> {booking.eventDate || "N/A"}</p>
                <p><strong>Guests:</strong> {booking.guests || 1}</p>
                <p><strong>Location:</strong> {booking.location || "N/A"}</p>
                <p><strong>Email:</strong> {booking.email || "N/A"}</p>
                <p><strong>Phone:</strong> {booking.phone || "N/A"}</p>
                <p>
                  <strong>Total Amount:</strong> ₹
                  {Number(booking.price || 0) *
                    Number(booking.guests || 1)}
                </p>
              </div>

              <div className="booking-confirmed">
                ✓ Booking Confirmed
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBookings;
