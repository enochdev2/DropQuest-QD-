import { getAnnouncementDetails } from "@/lib/utilityFunction";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // To extract parameters from the URL (if you're using React Router)

const AnnouncementDetail = () => {
  const { id } = useParams();
  const [announcement, setAnnouncement] = useState(null);
  console.log("🚀 ~ AnnouncementDetail ~ announcement:", announcement);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useNavigate();
  // Fetch the announcement details when the component mount

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
    // @ts-ignore
  }, [id]);

   if (loading) {
    return (
      <div className="flex bg-gray-950 justify-center items-center min-h-screen">
        <div className="spinner"></div> {/* Spinner component */}
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!announcement) {
    return <div>Announcement not found</div>;
  }

  return (
    <div className="min-h-screen flex justify-center bg-gray-950">
      <div className="min-h-screen sm:w-[400px] sm:border border-slate-600 bg-gray-950">
        <div className="px-4 sm:px-6 lg:px-4 py-6 max-w-4xl mx-auto">
          <button
            onClick={() => router(-1)}
            className="mb-6 flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-300 cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Announcements
          </button>

          {/* Announcement Detail */}
          <div className="bg-gray-900 rounded-lg p-3 sm:p-3 border border-gray-700">
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                {announcement?.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-6">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>
                    <strong>Created by:</strong> {announcement.createdBy}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>
                    <strong>Created at:</strong>{" "}
                    {new Date(announcement.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <div className="text-gray-300 leading-relaxed text-base sm:text-lg">
                <p className="mb-4 text-justify">{announcement?.content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementDetail;
