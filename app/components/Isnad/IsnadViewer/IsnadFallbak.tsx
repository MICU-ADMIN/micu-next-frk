import React from 'react';

function IsnadFallbak({ setIsnadData }: any) {
  return (
    <div className="justify-center items-center relative flex w-full h-full">
      <p
        className="absolute top-[0px] right-4 cursor-pointer z-50"
        onClick={() => setIsnadData(null)}
      >
        Close
      </p>
      <h2 className="mt-20">Isnad not available for this hadith</h2>
    </div>
  );
}

export default IsnadFallbak;
