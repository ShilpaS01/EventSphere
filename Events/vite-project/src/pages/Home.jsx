
import "./Home.css";
import "./Login.css";
function Home() {
  return (
    <div className="home-page">

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Plan Your Beautiful Event Here</h1>
          <p>
            Make every celebration special with unforgettable
            moments, beautiful decorations and perfect memories.
          </p>
        </div>
      </section>

      {/* Birthday and Wedding Images */}
      <section className="celebration-section">
        <h2>Beautiful Moments, Beautiful Memories</h2>
        <p className="section-description">
          Every occasion deserves a beautiful celebration.
        </p>

        <div className="image-gallery">
          <div className="image-card">
            <img
              src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800"
              alt="Birthday celebration"
            />
            <h3>Birthday Celebrations</h3>
          </div>

          <div className="image-card">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800"
              alt="Wedding celebration"
            />
            <h3>Wedding Celebrations</h3>
          </div>

          <div className="image-card">
            <img
              src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800"
              alt="Beautiful party decoration"
            />
            <h3>Special Celebrations</h3>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
