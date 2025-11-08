import { useLanguage } from "@/contexts/language-context";
import { getAnnouncement } from "@/lib/utilityFunction";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AnnouncementsPage() {
  const { language } = useLanguage();
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleAnnouncementClick();
  }, []);

  const handleAnnouncementClick = async () => {
    const announcementDetails = await getAnnouncement();
    setSelectedAnnouncement(announcementDetails);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex bg-gray-950 justify-center items-center min-h-screen">
        <div className="spinner"></div> {/* Spinner component */}
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20  bg-main">
      {/* <Navbar /> */}

      <div className="px-4 sm:px-6 sm:w-[400px] lg:px-8 py-6 max-w-7xl mx-auto sm:border border-gray-700">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12  bg-blue-600 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                />
              </svg>
            </div>
            <h1 className="text-lg sm:text-3xl font-bold text-white">
              {language === "en" ? "Annoucements" : "최신 에어드롭 소식"}
            </h1>
          </div>
          <p className="text-gray-300 text-sm sm:text-lg lg:text-lg max-w-md lg:max-w-2xl mx-auto">
            {language === "en"
              ? "Check out the latest airdrop information on DropQuest!"
              : "DropQuest에서 가장 최신의 에어드롭 정보를 확인하세요!"}
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 lg:grid- rounded-2xl">
          {selectedAnnouncement?.map((announcement) => (
            <div
              key={announcement.id}
              className="bg-black/70 rounded-lg p-4  border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-main border rounded-lg flex items-center justify-center text-white font-bold text-sm sm:text-lg">
                  {announcement.id}
                </div>

                <div className="flex-1 min-w-0">
                  <Link to={`/announcements/${announcement._id}`}>
                    <div className="flex items-start justify-between mb-0">
                      <div className="flex-1 pr-2">
                        <h3 className="text-md  font-semibold text-white mb-2 hover:text-blue-300 transition-colors duration-300 line-clamp-2">
                          {announcement.title}
                        </h3>

                        <div
                          className="text-gray-300 text-xs sm:text-sm mb-0 leading-relaxed line-clamp-2 lg:line-clamp-3"
                          dangerouslySetInnerHTML={{
                            __html: announcement.content,
                          }}
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row items-center gap-2 ml-2">
                        {announcement.isNew && (
                          <span className="px-2 sm:px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full whitespace-nowrap">
                            {language === "en" ? "NEW" : "새글"}
                          </span>
                        )}

                        <button className="p-1.5 sm:p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-400 hover:text-white transition-all duration-300 flex-shrink-0">
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedAnnouncement?.length === 0 && (
          <div className="text-center py-12 sm:py-16 lg:py-20">
            <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 text-white">
              {language === "en"
                ? "No Announcements Yet"
                : "아직 공지사항이 없습니다"}
            </h3>
            <p className="text-gray-300 text-base sm:text-lg lg:text-xl max-w-sm lg:max-w-md mx-auto">
              {language === "en"
                ? "Stay tuned for exciting updates and airdrop opportunities!"
                : "흥미진진한 업데이트와 에어드롭 기회를 기대해주세요!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AnnouncementsPage;
