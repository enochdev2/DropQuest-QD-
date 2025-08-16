import { getAnnouncementDetails } from "@/lib/utilityFunction";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // To extract parameters from the URL (if you're using React Router)

const AnnouncementDetail = () => {
  const { id } = useParams(); // Assuming the URL has the announcement ID as a parameter
  const [announcement, setAnnouncement] = useState(null);
  console.log("🚀 ~ AnnouncementDetail ~ announcement:", announcement);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the announcement details when the component mounts
  const fetchAnnouncementDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const details = await getAnnouncementDetails(id);
      setAnnouncement(details);

      setLoading(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAnnouncementDetails();
  }, [id]); // Fetch whenever the announcement ID changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!announcement) {
    return <div>Announcement not found</div>;
  }

  return (
    <div className="announcement-detail">
      <h1>{announcement?.title}</h1>
      <p>
        <strong>Created by:</strong> {announcement.createdBy}
      </p>
      <p>
        <strong>Created at:</strong>{" "}
        {new Date(announcement.createdAt).toLocaleDateString()}
      </p>
      <div className="announcement-content">
        <p>{announcement?.content}</p>
      </div>
    </div>
  );
};

export default AnnouncementDetail;
