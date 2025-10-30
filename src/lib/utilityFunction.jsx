/* eslint-disable react-refresh/only-export-components */

import { SuccessToast } from "@/components/Success";
import toast from "react-hot-toast";

// Fetch Token Slots
export const getTokenSlots = async (userId) => {
  console.log("🚀 ~ getTokenSlots ~ userId:", userId)
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      // `http://localhost:3000/api/v1/point/slots/${userId}`,
      `https://dropquest-qd-backend.onrender.com/api/v1/point/slots/${userId}`,
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
      const errorMsg =
        data.error || data.message || "Failed to fetch token slots";
      throw new Error(errorMsg);
    }

    return data;
  } catch (error) {
    console.error("Error fetching token slots:", error);
    throw error;
  }
};

export const getUserTokenSlots = async (userId) => {
  console.log("🚀 ~ getTokenSlots ~ userId:", userId)
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      // `http://localhost:3000/api/v1/point/slots`,
      `https://dropquest-qd-backend.onrender.com/api/v1/point/slots`,
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
      const errorMsg =
        data.error || data.message || "Failed to fetch token slots";
      throw new Error(errorMsg);
    }

    return data;
  } catch (error) {
    console.error("Error fetching token slots:", error);
    throw error;
  }
};
export const updateTokenSlotsOrder = async (userId) => {
  console.log("🚀 ~ getTokenSlots ~ userId:", userId)
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      // `http://localhost:3000/api/v1/point/slots`,
      `https://dropquest-qd-backend.onrender.com/api/v1/point/slots`,
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
      const errorMsg =
        data.error || data.message || "Failed to fetch token slots";
      throw new Error(errorMsg);
    }

    return data;
  } catch (error) {
    console.error("Error fetching token slots:", error);
    throw error;
  }
};

export const getAllUserTokenSlots = async () => {
 
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      // `http://localhost:3000/api/v1/point/allslots`,
      `https://dropquest-qd-backend.onrender.com/api/v1/point/allslots`,
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
      const errorMsg =
        data.error || data.message || "Failed to fetch token slots";
      throw new Error(errorMsg);
    }

    return data;
  } catch (error) {
    console.error("Error fetching token slots:", error);
    throw error;
  }
};

// Submit Point Exchange
export const submitPointExchange = async ( slotId, amount, tokenName, imageUrl) => {
  const userId = JSON.parse(localStorage.getItem("user"))._id
  console.log("🚀 ~ submitPointExchange ~ userId:", userId)
  try {
    // `https://dropquest-qd-backend.onrender.com/api/v1/user/users/${email}`,
    const token = localStorage.getItem("token");
    const response = await fetch(
      //  `http://localhost:3000/api/v1/point/buyslot`,
      `https://dropquest-qd-backend.onrender.com/api/v1/point/buyslot`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          slotId: slotId,
          amount: amount,
          tokenName: tokenName,
          imageUrl: imageUrl,
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      const errorMsg =
        data.error || data.message || "Failed to submit exchange";
        toast.error(errorMsg);
      throw new Error(errorMsg);
    }

    return data;
  } catch (error) {
    console.error("Error submitting point exchange:", error);
    throw error;
  }
};

export const updatePoints = async (link, name = "???", slotId, tokensAmount, points, imageUrl) => {
  console.log("🚀 ~ updatePoints ~ slotId, name:", slotId, name)
  try {
    // `https://dropquest-qd-backend.onrender.com/api/v1/user/users/${email}`,
    const token = localStorage.getItem("token");
    const response = await fetch(
      //  `http://localhost:3000/api/v1/point/updateslot`,
      `https://dropquest-qd-backend.onrender.com/api/v1/point/updateslot`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          link: link,
          name: name,
          slotId: slotId,
          token: tokensAmount,
          points: points,
          img: imageUrl,
        }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      const errorMsg =
        data.error || data.message || "Failed to submit exchange";
      throw new Error(errorMsg);
    }

    return data;
  } catch (error) {
    console.error("Error submitting point exchange:", error);
    throw error;
  }
};

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
          window.location.href = "/";
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
      // `http://localhost:3000/api/v1/user/${referralCode}`,
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
      // `http://localhost:3000/api/v1/point/points/claim`,
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
          window.location.href = "/";
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
      // `http://localhost:3000/api/v1/user/totalUsers`,
      `https://dropquest-qd-backend.onrender.com/api/v1/user/totalUsers`,
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

export const getAllUser = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `https://dropquest-qd-backend.onrender.com/api/v1/user/users`,
      // `http://localhost:3000/api/v1/user/users`,
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
         window.location.href = "/";
      }
      // ErrorToast(errorMsg);
    }

    return data; // Return updated user data
  } catch (error) {
    console.error("Error during user update:", error);
  }
};

// Function to get the referral code from the URL
export const getReferralCodeFromUrl = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const referralCode = urlParams.get("referral"); // Extract the referral code

  if (referralCode) {
    // Here, you can use the referral code for any logic you need (e.g., storing it, autofilling a form, etc.)
    return referralCode;
  } else {
    console.log("No referral code found.");
    return null; // No referral code found
  }
};

export const addannouncement = async (newAnnouncement) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      // `http://localhost:3000/api/v1/announcement/announcements`,
      `https://dropquest-qd-backend.onrender.com/api/v1/announcement/announcements`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAnnouncement),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      const errorMsg = data.error || data.message || "Failed to register user";
      if (errorMsg === "Invalid or expired token") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");
         window.location.href = "/";
      }
      // ErrorToast(errorMsg);
    }

    return data; // Return updated user data
  } catch (error) {
    console.error("Error during user update:", error);
  }
};

export const removeannouncement = async (announcementId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      // `http://localhost:3000/api/v1/announcement/announcements/${announcementId}`,
      `https://dropquest-qd-backend.onrender.com/api/v1/announcement/announcements/${announcementId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(newAnnouncement),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      const errorMsg = data.error || data.message || "Failed to register user";
      if (errorMsg === "Invalid or expired token") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");
         window.location.href = "/";
      }
      toast.error(errorMsg);
    } else {
      SuccessToast(data.message);
    }

    await getAnnouncement();

    return data; // Return updated user data
  } catch (error) {
    console.error("Error during user update:", error);
  }
};

export const Changeannouncement = async (newAnnouncement, announcementId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      // `http://localhost:3000/api/v1/announcement/announcements/${announcementId}`,
      `https://dropquest-qd-backend.onrender.com/api/v1/announcement/announcements/${announcementId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAnnouncement),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      const errorMsg = data.error || data.message || "Failed to register user";
      if (errorMsg === "Invalid or expired token") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");
         window.location.href = "/";
      }
      // ErrorToast(errorMsg);
    }

    return data; // Return updated user data
  } catch (error) {
    console.error("Error during user update:", error);
  }
};


export const modifyuserPoints = async (selectedUser, points ) => {
  console.log("🚀 ~ modifyuserPoints ~ selectedUser, points:", selectedUser, points)
  try {
    const token = localStorage.getItem("token");
    
    const response = await fetch(
      // `http://localhost:3000/api/v1/point/points/usermodify`,
      `https://dropquest-qd-backend.onrender.com/api/v1/point/points/usermodify`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: selectedUser,
          points: points,
        }),
        //  body: JSON.stringify({
        //   userId: selectedUser,
        //   points: Number(points),
        // }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      const errorMsg = data.error || data.message || "Failed to register user";
      if (errorMsg === "Invalid or expired token") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");
         window.location.href = "/";
      }
      // ErrorToast(errorMsg);
    }

    return data; // Return updated user data
  } catch (error) {
    console.error("Error during user update:", error);
  }
};
