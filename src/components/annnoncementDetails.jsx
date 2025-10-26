import { getAnnouncementDetails } from "@/lib/utilityFunction";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // To extract parameters from the URL (if you're using React Router)

const AnnouncementDetail = () => {
  const { id } = useParams();
  const [announcement, setAnnouncement] = useState(null);
  console.log("🚀 ~ AnnouncementDetail ~ announcement:", announcement);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [active, setActive] = useState("English");
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
  <div className="min-h-screen pt-14 flex justify-center bg-gray-950">
    <div className="min-h-screen sm:w-[400px] sm:border border-slate-600 bg-main">
      <div className="px-4 sm:px-6 py-4 max-w-4xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => router(-1)}
          className="mb-4 flex items-center gap-2 text-blue-400 hover:text-blue-300 transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
          </svg>
          <span>Back to Announcements</span>
        </button>

        {/* Wrapper */}
        <div className="bg-black/80 rounded-lg p-5 border border-gray-700 shadow-lg">

          {/* Tabs */}
          <div className="flex justify-center mb-6 space-x-3">
            {["English","Korean"].map(lang => (
              <button
                key={lang}
                onClick={() => setActive(lang)}
                className={`px-6 py-2 rounded border border-slate-500 text-sm transition font-medium ${
                  active === lang ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-lg font-bold text-white mb-3 leading-snug text-center">
            {active === "English" ? announcement?.title : announcement?.titlekorean}
          </h1>

          {/* Meta */}
          <div className="flex justify-between text-xs text-gray-400 border-y border-gray-700 py-2 mb-6">
            <span>By: {announcement.createdBy}</span>
            <span>{new Date(announcement.createdAt).toLocaleDateString()}</span>
          </div>

          {/* Content with paragraphs */}
          <div className="text-gray-200 text-sm leading-6 space-y-4">
            {(active === "English"
              ? announcement?.content
              : announcement?.contentkorean
            )
              ?.split(/\n\s*\n/)
              .map((p, idx) => (
                <p key={idx} className="text-justify">
                  {p.trim()}
                </p>
              ))}
          </div>

        </div>
      </div>
    </div>
  </div>
);

};

export default AnnouncementDetail;
