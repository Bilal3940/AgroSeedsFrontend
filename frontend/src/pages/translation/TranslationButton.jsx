import React from 'react';
import i18n from "../../i18n";

const TranslationButton = () => {
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div style={{ display: "flex", gap: "30px" }}>
      <select onChange={(e) => changeLanguage(e.target.value)} className="block w-24 py-2 px-3 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
        <option value="en">English</option>
        <option value="ur">اردو</option>
      </select>
    </div>
  );
};

export default TranslationButton;
