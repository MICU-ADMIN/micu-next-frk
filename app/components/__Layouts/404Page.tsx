import React from "react";

function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-7xl font-bold text-primary-500">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 my-5">Page not found</h2>
      <p className="text-gray-800">
        The page you are looking for does not exist.
      </p>
      <hr className="mt-[35px] mb-[35px] w-[400px]" />
      <p
        className="  text-5xl
      "
      >
        اِهۡدِنَا الصِّرَاطَ الۡمُسۡتَقِيۡمَۙ‏
      </p>
      <p className="mt-6 text-lg">Guide us to the straight path </p>
      <p>
        -{" "}
        <span className="text-gray-800 text-sm">Surah Al-Fatihah, Ayah 6</span>
      </p>
    </div>
  );
}

export default PageNotFound;
