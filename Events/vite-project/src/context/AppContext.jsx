
import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {

  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(
      localStorage.getItem("eventsphere_wishlist") || "[]"
    );
  });

  const [cart, setCart] = useState(() => {
    return JSON.parse(
      localStorage.getItem("eventsphere_cart") || "[]"
    );
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("eventsphere_theme") || "light";
  });

  // Save wishlist
  useEffect(() => {
    localStorage.setItem(
      "eventsphere_wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  // Save cart
  useEffect(() => {
    localStorage.setItem(
      "eventsphere_cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  // Save theme
  useEffect(() => {
    localStorage.setItem("eventsphere_theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Add or remove wishlist
  function toggleWishlist(event) {
    setWishlist((previous) => {
      const exists = previous.some(
        (item) => item.id === event.id
      );

      if (exists) {
        return previous.filter(
          (item) => item.id !== event.id
        );
      }

      return [...previous, event];
    });
  }

  // Add event to cart
  function addToCart(event) {
    setCart((previous) => {
      const exists = previous.find(
        (item) => item.id === event.id
      );

      if (exists) {
        return previous.map((item) =>
          item.id === event.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previous, { ...event, quantity: 1 }];
    });
  }

  // Remove event from cart
  function removeFromCart(eventId) {
    setCart((previous) =>
      previous.filter((item) => item.id !== eventId)
    );
  }

  // Update cart quantity
  function updateQuantity(eventId, quantity) {
    if (quantity < 1) return;

    setCart((previous) =>
      previous.map((item) =>
        item.id === eventId
          ? { ...item, quantity }
          : item
      )
    );
  }

  // Clear cart
  function clearCart() {
    setCart([]);
  }

  // Change theme
  function toggleTheme() {
    setTheme((previous) =>
      previous === "light" ? "dark" : "light"
    );
  }

  return (
    <AppContext.Provider
      value={{
        wishlist,
        cart,
        theme,
        toggleWishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleTheme
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      "useApp must be used inside AppProvider"
    );
  }

  return context;
}
