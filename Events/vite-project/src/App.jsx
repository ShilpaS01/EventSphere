
import { Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ExploreEvents from "./pages/ExploreEvents";
import EventDetails from "./pages/EventDetails";
import MyBookings from "./pages/MyBookings";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Pages */}
        <Route element={<ProtectedRoute />}>

          <Route
            path="/explore"
            element={<ExploreEvents />}
          />

          <Route
            path="/event/:id"
            element={<EventDetails />}
          />

          <Route
            path="/my-bookings"
            element={<MyBookings />}
          />

          <Route
            path="/wishlist"
            element={<Wishlist />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

        </Route>

        {/* Page Not Found */}
        <Route
          path="*"
          element={
            <div style={{ textAlign: "center", padding: "60px" }}>
              <h1>404 - Page Not Found</h1>
            </div>
          }
        />

      </Routes>

      <Footer />
    </>
  );
}

export default App;
