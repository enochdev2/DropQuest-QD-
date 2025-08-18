export const getUserProfile = async (email) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `https://dropquest-qd-backend.onrender.com/api/v1/user/users/${email}`,
      // `http://localhost:3000/api/v1/user/users/${email}`,
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
      `https://dropquest-qd-backend.onrender.com/api/v1/user/${referralCode}`,
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
      `https://dropquest-qd-backend.onrender.com/api/v1/point/points/claim`,
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


export const getAnnouncement = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `https://dropquest-qd-backend.onrender.com/api/v1/announcement/announcements`,
      // `http://localhost:3000/api/v1/announcement/announcements`,
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

export const getAnnouncementDetails = async (announcementId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `https://dropquest-qd-backend.onrender.com/api/v1/announcement/${announcementId}`,
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

export const getTotalUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:3000/api/v1/user/totalUsers`,
      // `https://dropquest-qd-backend.onrender.com/api/v1/user/totalUsers`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log("🚀 ~ getTotalUser ~ data:", data)
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

export const getAllUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `http://localhost:3000/api/v1/user/users`,
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
