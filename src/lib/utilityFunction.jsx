export const getUserProfile = async (email) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:3000/api/v1/user/users/${email}`,
      // `https://tether-p2p-exchang-backend.onrender.com/api/v1/user/users/${user?.nickname}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    if (!response.ok) {
      const errorMsg = data.error || data.message || "Failed to register user";
      if (errorMsg === "Invalid or expired token") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");
      }
      // ErrorToast(errorMsg);
    }

    return data; // Return updated user data
  } catch (error) {
    console.error("Error during user update:", error);
  }
};


export const getUserReferralList = async (referralCode) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:3000/api/v1/user/${referralCode}`,
      // `https://tether-p2p-exchang-backend.onrender.com/api/v1/user/users/${user?.nickname}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    if (!response.ok) {
      const errorMsg = data.error || data.message || "Failed to register user";
      if (errorMsg === "Invalid or expired token") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");
      }
      // ErrorToast(errorMsg);
    }

    return data; // Return updated user data
  } catch (error) {
    console.error("Error during user update:", error);
  }
};


export const claimPoints = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:3000/api/v1/point/points/claim`,
      // `https://tether-p2p-exchang-backend.onrender.com/api/v1/user/users/${user?.nickname}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId: JSON.parse(localStorage.getItem("user"))._id,
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      const errorMsg = data.error || data.message || "Failed to register user";
      if (errorMsg === "Invalid or expired token") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");
      }
      // ErrorToast(errorMsg);
    }

    return data; // Return updated user data
  } catch (error) {
    console.error("Error during user update:", error);
  }
};
