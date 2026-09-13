import { useState } from "react";
import {
  Moon,
  Sun,
  Bell,
  Globe,
  User,
  Mail,
  Lock,
  Settings as SettingsIcon,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";

function Settings() {
  const { user, logout } = useAuth();
  const { i18n, t } = useTranslation("settings");

  const [notifications, setNotifications] = useState(true);

  const [language, setLanguage] = useState(
    i18n.language === "ar" ? "Arabic" : "English"
  );

  const [darkMode, setDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  const handleDarkMode = () => {
    const newMode = !darkMode;

    setDarkMode(newMode);

    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;

    setLanguage(selectedLanguage);

    i18n.changeLanguage(
      selectedLanguage === "Arabic" ? "ar" : "en"
    );
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] dark:bg-[#111827] p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#17233C] dark:bg-[#374151]">
            <SettingsIcon className="h-5 w-5 text-white" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-[#17233C] dark:text-white">
            {t("title")}
          </h1>
        </div>

        <p className="text-sm sm:text-base text-[#7B8190] dark:text-gray-400">
          {t("description")}
        </p>
      </div>

      <div className="max-w-4xl space-y-6">
        {/* Preferences */}
        <section className="rounded-2xl border border-[#E5E7EB] dark:border-gray-700 bg-white dark:bg-[#1F2937] shadow-sm overflow-hidden transition-colors">
          <div className="border-b border-[#E5E7EB] dark:border-gray-700 px-5 py-5 sm:px-6">
            <h2 className="text-lg font-semibold text-[#17233C] dark:text-white">
              {t("preferences")}
            </h2>

            <p className="mt-1 text-sm text-[#7B8190] dark:text-gray-400">
              {t("preferencesDescription")}
            </p>
          </div>

          <div className="divide-y divide-[#E5E7EB] dark:divide-gray-700">
            {/* Dark Mode */}
            <div className="flex items-center justify-between gap-4 px-5 py-5 sm:px-6">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F7F5F0] dark:bg-[#374151]">
                  {darkMode ? (
                    <Moon className="h-5 w-5 text-[#E89A5B]" />
                  ) : (
                    <Sun className="h-5 w-5 text-[#E89A5B]" />
                  )}
                </div>

                <div>
                  <h3 className="font-medium text-[#1F2937] dark:text-white">
                    {t("darkMode")}
                  </h3>

                  <p className="text-sm text-[#7B8190] dark:text-gray-400">
                    {t("darkModeDescription")}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleDarkMode}
                aria-label="Toggle dark mode"
                className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300 ${
                  darkMode ? "bg-[#E89A5B]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${
                    darkMode ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Language */}
            <div className="flex items-center justify-between gap-4 px-5 py-5 sm:px-6">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F7F5F0] dark:bg-[#374151]">
                  <Globe className="h-5 w-5 text-[#E89A5B]" />
                </div>

                <div>
                  <h3 className="font-medium text-[#1F2937] dark:text-white">
                    {t("language")}
                  </h3>

                  <p className="text-sm text-[#7B8190] dark:text-gray-400">
                    {t("languageDescription")}
                  </p>
                </div>
              </div>

              <select
                value={language}
                onChange={handleLanguageChange}
                className="rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-[#1F2937] outline-none focus:border-[#E89A5B] dark:border-gray-600 dark:bg-[#374151] dark:text-white"
              >
                <option value="English">{t("english")}</option>
                <option value="Arabic">{t("arabic")}</option>
              </select>
            </div>

            {/* Notifications */}
            <div className="flex items-center justify-between gap-4 px-5 py-5 sm:px-6">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F7F5F0] dark:bg-[#374151]">
                  <Bell className="h-5 w-5 text-[#E89A5B]" />
                </div>

                <div>
                  <h3 className="font-medium text-[#1F2937] dark:text-white">
                    {t("notifications")}
                  </h3>

                  <p className="text-sm text-[#7B8190] dark:text-gray-400">
                    {t("notificationsDescription")}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setNotifications(!notifications)}
                aria-label="Toggle notifications"
                className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-300 ${
                  notifications ? "bg-[#E89A5B]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${
                    notifications ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        {/* Account */}
        <section className="rounded-2xl border border-[#E5E7EB] dark:border-gray-700 bg-white dark:bg-[#1F2937] shadow-sm overflow-hidden transition-colors">
          <div className="border-b border-[#E5E7EB] dark:border-gray-700 px-5 py-5 sm:px-6">
            <h2 className="text-lg font-semibold text-[#17233C] dark:text-white">
              {t("account")}
            </h2>

            <p className="mt-1 text-sm text-[#7B8190] dark:text-gray-400">
              {t("accountDescription")}
            </p>
          </div>

          <div className="p-5 sm:p-6 space-y-5">
            {/* Name */}
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F7F5F0] dark:bg-[#374151]">
                <User className="h-5 w-5 text-[#E89A5B]" />
              </div>

              <div>
                <p className="text-xs text-[#7B8190] dark:text-gray-400">
                  {t("name")}
                </p>

                <p className="font-medium text-[#1F2937] dark:text-white">
                  {user?.name || user?.username || "Admin User"}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F7F5F0] dark:bg-[#374151]">
                <Mail className="h-5 w-5 text-[#E89A5B]" />
              </div>

              <div>
                <p className="text-xs text-[#7B8190] dark:text-gray-400">
                  {t("email")}
                </p>

                <p className="font-medium text-[#1F2937] dark:text-white break-all">
                  {user?.email || "admin@example.com"}
                </p>
              </div>
            </div>

            {/* Password */}
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F7F5F0] dark:bg-[#374151]">
                <Lock className="h-5 w-5 text-[#E89A5B]" />
              </div>

              <div>
                <p className="text-xs text-[#7B8190] dark:text-gray-400">
                  {t("password")}
                </p>

                <p className="font-medium text-[#1F2937] dark:text-white">
                  ••••••••
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Settings;