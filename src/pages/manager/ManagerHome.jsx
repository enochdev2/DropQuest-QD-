"use client";

import { SuccessToast } from "@/components/Success";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronRight,
  RefreshCw,
  Loader2,
  ArrowLeft,
  Loader,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/dq.png";
import { getUserProfile } from "@/lib/utilityFunction";
import { useLanguage } from "@/contexts/language-context";

const BASE_URL = "https://dropquest-qd-backend.onrender.com";

export default function ManagerDashboard() {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingManDel, setLoadingManDel] = useState(false);
  const [referralLoading, setReferralLoading] = useState(false);
  const [managerReferralLoading, setManagerReferralLoading] = useState({}); // CHANGED: Added state for per-manager loading
  const [showManagers, setShowManagers] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);
  const [unlocked, setUnlocked] = useState(false);
  const [expandedManager, setExpandedManager] = useState(null);
  const [expandedUser, setExpandedUser] = useState(null);
  const [managerSearchTerm, setManagerSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentManagerPage, setCurrentManagerPage] = useState(1);
  const [referralSearchTerm, setReferralSearchTerm] = useState("");
  const [referralCurrentPage, setReferralCurrentPage] = useState(1);
  const [allUsers, setAllUsers] = useState([]);
  const [myReferrals, setMyReferrals] = useState([]);
  const [managerReferrals, setManagerReferrals] = useState({}); // CHANGED: Added state to store referrals per manager { email: [users] }
  const [personalData, setPersonalData] = useState("");
  const [allManagers, setAllManagers] = useState([]);
  const inputRefs = useRef([]);

  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState(["", "", "", ""]);

  const mainItemsPerPage = 10;
  const managerItemsPerPage = 10;
  const referralItemsPerPage = 5;

  const fetchAllUsers = async () => {
    try {
      let page = 1;
      // let fetchedUsers = [];
      let fetchedReferrals = [];
      const token = localStorage.getItem("token");
      while (true) {
        const response = await fetch(
          // `http://localhost:3000/api/v1/user/managersref?page=${page}`,
          `https://dropquest-qd-backend.onrender.com/api/v1/user/managersref?page=${page}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        if (!response.ok) {
          throw new Error("Failed to fetch my referrals");
        }
        const data = await response.json();
        console.log("🚀 ~ fetchMyReferrals ~ data:", data);
        if (!data.users || data.users.length === 0) break;
        fetchedReferrals = [...fetchedReferrals, ...data.users];
        if (data.users.length < 10) break;
        page++;
      }
      setMyReferrals(fetchedReferrals);
      setAllUsers(fetchedReferrals);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchMyReferrals = async () => {
    try {
      let page = 1;
      let fetchedReferrals = [];
      const token = localStorage.getItem("token");
      while (true) {
        const response = await fetch(
          // `http://localhost:3000/api/v1/user/managersref?page=${page}`,
          `https://dropquest-qd-backend.onrender.com/api/v1/user/managersref?page=${page}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch my referrals");
        }
        const data = await response.json();
        console.log("🚀 ~ fetchMyReferrals ~ data:", data);
        if (!data.users || data.users.length === 0) break;
        fetchedReferrals = [...fetchedReferrals, ...data.users];
        if (data.users.length < 10) break;
        page++;
      }
      setMyReferrals(fetchedReferrals);
    } catch (error) {
      console.error("Error fetching my referrals:", error);
    }
  };

  // CHANGED: New function to fetch referrals for a specific manager
  const fetchManagerReferrals = async (managerEmail) => {
    console.log("🚀 ~ fetchManagerReferrals ~ managerEmail:", managerEmail);
    setLoadingManDel(true);
    // if (managerReferrals[managerEmail]) return; // Already fetched
    setManagerReferralLoading((prev) => ({ ...prev, [managerEmail]: true }));
    try {
      let page = 1;
      let fetchedReferrals = [];
      const token = localStorage.getItem("token");
      while (true) {
        const response = await fetch(
          // `http://localhost:3000/api/v1/user/managerref?managerEmail=${managerEmail}&page=${page}`, // CHANGED: Added managerEmail query param
          `https://dropquest-qd-backend.onrender.com/api/v1/user/managerref?managerEmail=${managerEmail}&page=${page}`, // CHANGED: Added managerEmail query param
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch manager referrals");
        }
        setLoadingManDel(false);
        const data = await response.json();
        console.log("🚀 ~ fetchManagerReferrals ~ data:", data);
        console.log(
          `🚀 ~ fetchManagerReferrals ~ data for ${managerEmail}:`,
          data
        );
        if (!data.users || data.users.length === 0) break;
        fetchedReferrals = [...fetchedReferrals, ...data.users];
        if (data.users.length < 10) break;
        page++;
      }
      setManagerReferrals((prev) => ({
        ...prev,
        [managerEmail]: fetchedReferrals,
      }));
    } catch (error) {
      console.error("Error fetching manager referrals:", error);
    } finally {
      setManagerReferralLoading((prev) => ({ ...prev, [managerEmail]: false }));
    }
  };

  const personalProfile = async () => {
    setReferralLoading(true);
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const user = await getUserProfile(userInfo.email);
    setPersonalData(user?.email);
    setReferralLoading(false);
    setSelectedManager(user?.email);
  };

  const fetchAllManagers = async () => {
    try {
      let page = 1;
      let fetchedManagers = [];
      const token = localStorage.getItem("token");

      while (true) {
        const response = await fetch(
          `https://dropquest-qd-backend.onrender.com/api/v1/user/managers?page=${page}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            cache: "no-cache",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch managers");
        }
        const data = await response.json();
        console.log("🚀 ~ fetchAllManagers ~ managers:", data.managers);
        if (!data.managers || data.managers.length === 0) break;
        fetchedManagers = [
          ...fetchedManagers,
          ...data.managers.map((manager) => manager.email),
        ];
        if (data.managers.length < 10) break;
        page++;
      }
      setAllManagers(fetchedManagers);
    } catch (error) {
      console.error("Error fetching managers:", error);
    }
  };

  useEffect(() => {
    personalProfile();
    fetchAllUsers();

    // handleMyReferralsClick();
  }, []);

  useEffect(() => {
    if (unlocked) {
      fetchAllManagers();
    }
  }, [unlocked]);

  const handlePasswordChange = (index, value) => {
    const newPass = [...password];
    newPass[index] = value;
    setPassword(newPass);

    // Automatically move to next box
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !password[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleOk = () => {
    const enteredPassword = password.join("");
    if (enteredPassword === "99dq") {
      console.log("Password entered:", enteredPassword);
      setUnlocked(true);
      setShowManagers(true);
      setPassword(["", "", "", ""]);
      setShowModal(false);
    } else {
      SuccessToast("Incorrect password");
      setPassword(["", "", "", ""]);
    }
  };

  // CHANGED: Updated toggleExpand to fetch referrals for the specific manager
  const toggleExpand = async (manager) => {
    if (expandedManager === manager) {
      setExpandedManager(null);
      setExpandedUser(null);
      setReferralSearchTerm("");
      setReferralCurrentPage(1);
    } else {
      await fetchManagerReferrals(manager); // CHANGED: Fetch on expand
      setExpandedManager(manager);
      setExpandedUser(null);
      setReferralSearchTerm("");
      setReferralCurrentPage(1);
    }
  };

  const toggleUserExpand = (userEmail) => {
    setExpandedUser((prev) => (prev === userEmail ? null : userEmail));
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleMyReferralsClick = async () => {
    if (!personalData) return; // Ensure personalData is set
    setReferralLoading(true);
    setSelectedManager(personalData);
    setShowManagers(false);
    setExpandedManager(null);
    setExpandedUser(null);
    setSearchTerm("");
    setCurrentPage(1);
    setCurrentManagerPage(1);
    await fetchMyReferrals();
    setReferralLoading(false);
  };

  const handleManagerManagementClick = () => {
    if (!showManagers) {
      if (!unlocked) {
        setShowModal(true);
      } else {
        setShowManagers(true);
        setCurrentManagerPage(1);
      }
    }
  };

  const dataSource = showManagers ? allUsers : myReferrals;

  const searchedAndSorted = dataSource
    .filter((user) => user.referral === selectedManager)
    .filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort(
      (a, b) => new Date(b.registrationDate) - new Date(a.registrationDate)
    );

  const displayedUsers = searchedAndSorted.slice(
    (currentPage - 1) * mainItemsPerPage,
    currentPage * mainItemsPerPage
  );

  const totalMainPages = Math.ceil(searchedAndSorted.length / mainItemsPerPage);

  const filteredManagers = allManagers.filter((manager) =>
    manager.toLowerCase().includes(managerSearchTerm.toLowerCase())
  );

  const displayedManagers = filteredManagers.slice(
    (currentManagerPage - 1) * managerItemsPerPage,
    currentManagerPage * managerItemsPerPage
  );

  const totalManagerPages = Math.ceil(
    filteredManagers.length / managerItemsPerPage
  );

  // CHANGED: Updated to use managerReferrals state instead of allUsers
  const managerUsersForTable = (manager) =>
    (managerReferrals[manager] || []).sort(
      (a, b) => new Date(b.registrationDate) - new Date(a.registrationDate)
    );

  const getDisplayedManagerUsers = (manager) => {
    const allManagerUsers = managerUsersForTable(manager);
    const filteredManagerUsers = allManagerUsers.filter((user) =>
      user.name.toLowerCase().includes(referralSearchTerm.toLowerCase())
    );
    const sortedFiltered = filteredManagerUsers.sort(
      (a, b) => new Date(b.registrationDate) - new Date(a.registrationDate)
    );
    return sortedFiltered.slice(
      (referralCurrentPage - 1) * referralItemsPerPage,
      referralCurrentPage * referralItemsPerPage
    );
  };

  const getFilteredManagerUsersLength = (manager) => {
    const allManagerUsers = managerUsersForTable(manager);
    return allManagerUsers.filter((user) =>
      user.name.toLowerCase().includes(referralSearchTerm.toLowerCase())
    ).length;
  };

  const getTotalReferralPages = (manager) =>
    Math.ceil(getFilteredManagerUsersLength(manager) / referralItemsPerPage);

  return (
    <div className="min-h-screen bg-black">
      <div className="px-16 bg-black border-b border-cyan-100  py-6 shadow-sm"></div>
      <div className="w-full flex flex-col pt-7 items-center justify-center py-5">
        <div className="bg-main px-4 py-3 rounded-lg shadow-lg">
          <h1
            className="text-3xl font-bold text-gray-200"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            DropQuest Manager Dashboard
          </h1>
        </div>
      </div>

      <div className="py-2 px-24 ">
        <div className="min-h-screen bg-black text-white py-6 font-sans">
          <div className="max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div className="bg-main text-xl px-4 py-2 rounded-md font-bold">
                Login : {personalData}
              </div>
              <h1 className="text-2xl font-bold hidden bg-gray-800 px-4 py-2 rounded-md">
                DropQuest Manager Dashboard
              </h1>
            </div>

            {/* Buttons */}
            <div className="flex justify-center mt-10 gap-10 mb-10 ">
              <button
                className={`font-semibold px-6 py-2 text-xl rounded-full shadow-md ${
                  showManagers
                    ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                    : "bg-main border hover:bg-blue-700 text-white"
                }`}
                onClick={handleMyReferralsClick}
              >
                {t("myReferralList")}
              </button>
              <button
                className={`font-semibold px-6 py-2 text-xl rounded-full shadow-md ${
                  showManagers
                    ? "bg-orange-500 border"
                    : "bg-orange-600 hover:bg-orange-700"
                }  text-white`}
                onClick={handleManagerManagementClick}
              >
                {t("managermanagement")}
              </button>
            </div>

            {/* Content based on state */}
            {showManagers ? (
              <>
                <div>
                  <button
                    className="flex  gap-5 text-2xl font-bold py-3 px-4 rounded-4xl mb-2 bg-[#000856] hover:bg-[#000b7d] text-white cursor-pointer"
                    onClick={() => setExpandedManager(null)}
                  >
                    <ArrowLeft size={30} /> {t("backbutton")}
                  </button>
                </div>
                <div
                  div
                  className="border py-5 px-4 rounded-lg border-[#000856]/30"
                >
                  {/* Search & Stats for Managers */}
                  <div className="flex justify-between   items-center mb-4 ">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder={t("searchForManagerEmail")}
                        value={managerSearchTerm}
                        onChange={(e) => {
                          setManagerSearchTerm(e.target.value);
                          setCurrentManagerPage(1);
                        }}
                        className="bg-black/40 border border-blue-600/40 text-white text-xl px-3 py-2 rounded-md focus:outline-none"
                      />
                      <button className="bg-main border border-blue-700 hover:bg-blue-600 text-xl font-bold px-4 py-2 rounded-md cursor-pointer">
                        Enter
                      </button>
                    </div>

                    <div className="flex items-center ">
                      <span className="bg-orange-700 px-4 py-2 text-lg rounded-md">
                        {t("numberOfUsers")}
                      </span>
                      <span className="w-10 h-1 bg-orange-700 "></span>
                      <span className="bg-orange-900 px-4 py-2 font-bold text-xl rounded-md">
                        {filteredManagers.length}
                      </span>
                    </div>

                    <div className="bg-orange-800 px-4 py-2 text-xl font-semibold rounded-md">
                      Manager List
                    </div>
                  </div>

                  {/* Manager Table */}
                  <div className="bg-main gradient-to-tr from-[#aa1f2d] via-[#a91587] to=[#3c1f4e]  mt-10 border border-slate-400 rounded-lg overflow-hidden">
                    <table className="w-full text-center">
                      <thead className="  bg-[#000856] ">
                        <tr>
                          <th className="px-4 py-3 flex w-full justify-center">
                            {t("managerEmail")}
                            {loadingManDel && (
                              <Loader2 className="animate-spin" />
                            )}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {displayedManagers.map((manager, i) => {
                          const isExpanded = expandedManager === manager;
                          const displayedManagerUsers =
                            getDisplayedManagerUsers(manager);
                          const totalReferralPagesForManager =
                            getTotalReferralPages(manager);
                          return (
                            <>
                              <tr
                                key={i}
                                className="border-t border-[#000b7d] hover:bg-gray-800 cursor-pointer "
                                onClick={() => toggleExpand(manager)}
                              >
                                <td className="px-4 text-xl font-bold py-3 text-blue-100 bg-black/50 hover:underline flex items-center justify-between underline-none">
                                  <span className="ml-2 invisible">
                                    {isExpanded ? (
                                      <ChevronDown className="w-4 h-4" />
                                    ) : (
                                      <ChevronRight className="w-4 h-4" />
                                    )}
                                  </span>
                                  <span className="flex">{manager}</span>
                                  <span className="ml-2">
                                    {isExpanded ? (
                                      <ChevronDown className="w-4 h-4" />
                                    ) : (
                                      <ChevronRight className="w-4 h-4" />
                                    )}
                                  </span>
                                </td>
                              </tr>
                              {isExpanded && (
                                <tr>
                                  <td className="px-2 py-3">
                                    <div className="pl-2 pb-4">
                                      {/* CHANGED: Added loading spinner for manager referrals */}
                                      {managerReferralLoading[manager] ? (
                                        <div className="flex justify-center items-center py-4">
                                          <Loader2 className="w-6 h-6 animate-spin text-blue-500 mr-2" />
                                          <span className="text-gray-400">
                                            Loading referrals...
                                          </span>
                                        </div>
                                      ) : (
                                        <>
                                          <div className="flex items-center gap-2 mb-2">
                                            <input
                                              type="text"
                                              placeholder="Search for a user name"
                                              value={referralSearchTerm}
                                              onChange={(e) => {
                                                setReferralSearchTerm(
                                                  e.target.value
                                                );
                                                setReferralCurrentPage(1);
                                              }}
                                              className="bg-black/30 border border-[#000b7d] text-white text-lg px-4 py-2 rounded-md focus:outline-none flex-1 max-w-xs"
                                            />
                                            <button className="bg-[#000b7d] border-blue-900 hover:bg-gray-600 text-xl border font-bold px-4 py-1 rounded-md">
                                              Enter
                                            </button>
                                          </div>
                                          <div className="bg-[#000b7d] border border-blue-500/30 mb-2 px-4 py-3 rounded-md">
                                            <span className="text-base text-gray-50 font-semibold">
                                              Referrals (
                                              {getFilteredManagerUsersLength(
                                                manager
                                              )}
                                              )
                                            </span>
                                          </div>
                                          {displayedManagerUsers.length > 0 ? (
                                            <>
                                              <table className="w-full text-left bg-black/50 border border-gray-600 rounded-lg overflow-hidden">
                                                <thead className="bg-sky-950 font-semibold">
                                                  <tr>
                                                    <th className="px-4 py-3 text-sm">
                                                      {t("email")}
                                                    </th>
                                                    <th className="px-4 py-3 text-sm">
                                                      {t("name")}
                                                    </th>
                                                    <th className="px-4 py-3 text-sm">
                                                      {t("phoneNumber")}
                                                    </th>
                                                    <th className="px-4 py-3 text-sm">
                                                      {t("telegramId")}
                                                    </th>
                                                    <th className="px-4 py-3 text-sm">
                                                      {t("referralEmails")}
                                                    </th>
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                  {displayedManagerUsers.map(
                                                    (user, j) => {
                                                      const isUserExpanded =
                                                        expandedUser ===
                                                        user.email;
                                                      return (
                                                        <>
                                                          <tr
                                                            key={j}
                                                            className="border-t-2 border-black  text-xl hover:bg-blue-950 cursor-pointer"
                                                            onClick={(e) => {
                                                              e.stopPropagation();
                                                              toggleUserExpand(
                                                                user.email
                                                              );
                                                            }}
                                                          >
                                                            <td className="px-3 py-4 text-lg">
                                                              {user.email}
                                                            </td>
                                                            <td className="px-3 py-2 text-lg">
                                                              {user.name}
                                                            </td>
                                                            <td className="px-3 py-2 text-base">
                                                              {user.phone}
                                                            </td>
                                                            <td className="px-3 py-2 text-base">
                                                              {user.telegram}
                                                            </td>
                                                            <td className="px-3 py-2 text-base">
                                                              {user.referral}
                                                            </td>
                                                          </tr>
                                                          {isUserExpanded && (
                                                            <tr>
                                                              <td
                                                                colSpan={5}
                                                                className="px-3 py-3 bg-main"
                                                              >
                                                                <div className="pl-4">
                                                                  <span className="text-sm text-gray-300">
                                                                    Registration
                                                                    date:{" "}
                                                                    {
                                                                      user.registrationDate
                                                                    }
                                                                  </span>
                                                                </div>
                                                              </td>
                                                            </tr>
                                                          )}
                                                        </>
                                                      );
                                                    }
                                                  )}
                                                </tbody>
                                              </table>
                                              <div className="flex justify-center items-center gap-2 mt-4">
                                                <span className="bg-orange-700 px-2 py-1 rounded-md text-sm">
                                                  Page
                                                </span>
                                                {Array.from(
                                                  {
                                                    length: Math.min(
                                                      5,
                                                      totalReferralPagesForManager
                                                    ),
                                                  },
                                                  (_, i) => i + 1
                                                ).map((n) => (
                                                  <button
                                                    key={n}
                                                    className={`px-2 py-1 rounded-md text-sm ${
                                                      n === referralCurrentPage
                                                        ? "bg-orange-600"
                                                        : "bg-gray-700 hover:bg-gray-600"
                                                    }`}
                                                    onClick={() =>
                                                      setReferralCurrentPage(n)
                                                    }
                                                  >
                                                    {n}
                                                  </button>
                                                ))}
                                                {totalReferralPagesForManager >
                                                  5 && (
                                                  <span className="text-gray-500 text-sm">
                                                    ...
                                                  </span>
                                                )}
                                              </div>
                                            </>
                                          ) : (
                                            <p className="text-gray-400 text-sm">
                                              No referrals
                                            </p>
                                          )}
                                        </>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination for Managers */}
                  <div className="flex justify-center items-center gap-3 mt-20">
                    <span className="bg-orange-700 px-3 py-2 rounded-md">
                      Page
                    </span>
                    {Array.from(
                      { length: Math.min(5, totalManagerPages) },
                      (_, i) => i + 1
                    ).map((n) => (
                      <button
                        key={n}
                        className={`px-3 py-2 rounded-md ${
                          n === currentManagerPage
                            ? "bg-orange-600"
                            : "bg-gray-700 hover:bg-gray-600"
                        }`}
                        onClick={() => setCurrentManagerPage(n)}
                      >
                        {n}
                      </button>
                    ))}
                    {totalManagerPages > 5 && (
                      <span className="text-gray-500 text-2xl font-bold">
                        ...
                      </span>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Search & Stats for Referrals */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Search for a user name"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="bg-gray-900/20 border  border-blue-900 text-white text-xl px-3 py-2 rounded-md focus:outline-none"
                    />
                    <button className="bg-main border border-blue-300 hover:bg-gray-600 text-xl font-bold px-4 py-2 rounded-md">
                      Enter
                    </button>
                  </div>

                  <div className="flex items-center gap-">
                    <span className="bg-main font-semibold border border-blue-900 px-4 py-2 text-lg rounded-md">
                      {t("numberOfUsers")}
                    </span>
                    <span className="h-1 w-8 bg-main"></span>
                    <span className="bg-main px-4 py-2 font-bold text-xl rounded-md">
                      {searchedAndSorted.length}
                    </span>
                  </div>

                  <div className="bg-main px-4 py-2 text-xl font-semibold rounded-md">
                    Target : {selectedManager}
                  </div>
                </div>

                {/* Referral Table */}
                <div className="bg-main mt-10 border border-[#000b7d] rounded-lg overflow-hidden">
                  {referralLoading ? (
                    <div className="flex justify-center items-center py-8">
                      <Loader2 className="w-8 h-8 animate-spin text-blue-500 mr-2" />
                      <span className="text-gray-400">
                        Loading referrals...
                      </span>
                    </div>
                  ) : searchedAndSorted.length > 0 ? (
                    <table className="w-full text-left">
                      <thead className="bg-blue-500/30">
                        <tr>
                          <th className="px-4 py-3">{t("email")}</th>
                          <th className="px-4 py-3">{t("name")}</th>
                          <th className="px-4 py-3">{t("phoneNumber")}</th>
                          <th className="px-4 py-3">{t("telegramId")}</th>
                          <th className="px-4 py-3">{t("referralEmails")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {displayedUsers.map((user, i) => {
                          const isExpanded = expandedUser === user.email;
                          return (
                            <>
                              <tr
                                key={i}
                                className="border-t border-[#000b7d] hover:bg-[#000b7d]  font-semibold cursor-pointer"
                                onClick={() => toggleUserExpand(user.email)}
                              >
                                <td className="px-4 py-3 bg-black/20">
                                  {user.email}
                                </td>
                                <td className="px-4 py-3 ">{user.name}</td>
                                <td className="px-4 py-3 bg-black/20">
                                  {user.phone}
                                </td>
                                <td className="px-4 py-3">{user.telegram}</td>
                                <td className="px-4 py-3 bg-black/20">
                                  {user.referral}
                                </td>
                              </tr>
                              {isExpanded && (
                                <tr>
                                  <td
                                    colSpan={5}
                                    className="px-4 py-2 bg-[#000856]"
                                  >
                                    <div className="pl-4 ">
                                      <span className="text-sm  text-gray-300 font-semibold">
                                        {t("registrationdate")}:{" "}
                                        {user.registrationDate}
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                              )}
                            </>
                          );
                        })}
                      </tbody>
                    </table>
                  ) : (
                    <div className="flex justify-center py-8 items-center ">
                      <p className="text-gray-100 text-3xl font-bold">
                        No referral yet
                      </p>
                    </div>
                  )}
                </div>

                {!referralLoading && searchedAndSorted.length > 0 && (
                  /* Pagination for Referrals */
                  <div className="flex justify-center items-center gap-3 mt-20">
                    <span className="bg-blue-700 px-3 py-2 rounded-md">
                      Page
                    </span>
                    {Array.from(
                      { length: Math.min(5, totalMainPages) },
                      (_, i) => i + 1
                    ).map((n) => (
                      <button
                        key={n}
                        className={`px-3 py-2 rounded-md ${
                          n === currentPage
                            ? "bg-blue-600"
                            : "bg-gray-700 hover:bg-gray-600"
                        }`}
                        onClick={() => setCurrentPage(n)}
                      >
                        {n}
                      </button>
                    ))}
                    {totalMainPages > 5 && (
                      <span className="text-gray-500 text-2xl font-bold">
                        ...
                      </span>
                    )}
                  </div>
                )}
              </>
            )}

            {/* Password Modal */}
            {showModal && (
              <div className="fixed inset-0 bg-black/20 bg-opacity-70 flex items-center justify-center z-50">
                <div className="bg-main rounded-3xl px-8 pt-8 pb-4 text-center shadow-2xl border border-white/30 w-[500px]">
                  <h2 className="text-2xl text-white font-bold mb-6">
                    {t("password")}
                  </h2>
                  <div className="flex justify-center gap-4 mb-10">
                    {password.map((char, i) => (
                      <input
                        key={i}
                        type="text"
                        maxLength={1}
                        value={char}
                        ref={(el) => (inputRefs.current[i] = el)}
                        onChange={(e) =>
                          handlePasswordChange(i, e.target.value)
                        }
                        onKeyDown={(e) => handleKeyDown(i, e)}
                        className="w-16 h-16 text-white text-center text-2xl font-semibold rounded-md focus:outline-none border border-gray-300"
                      />
                    ))}
                  </div>
                  <div className="flex justify-center gap-16">
                    <button
                      onClick={handleOk}
                      className="bg-[#000856] hover:bg-blue-700 border text-white font-semibold px-6 py-2 rounded-md shadow-md cursor-pointer"
                    >
                      {t("ok")}
                    </button>
                    <button
                      onClick={() => setShowModal(false)}
                      className="bg-green-200 hover:bg-blue-300 text-black font-semibold px-6 py-2 rounded-md shadow-md cursor-pointer"
                    >
                      {t("cancel")}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
