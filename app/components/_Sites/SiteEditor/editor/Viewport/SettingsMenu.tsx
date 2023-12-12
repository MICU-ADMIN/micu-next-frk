import React from "react";

type Props = {
  close: () => void;
};

function SettingsMenu({ close }: Props) {
  return (
    <>
      <div className="modal-center">
        <div className="h-[85vh] w-[800px] p-4">
          <h2 className="text-2xl text-indigo-500">Page Settings</h2>
        </div>
      </div>
      <div onClick={close} className="modal-overlay"></div>
    </>
  );
}

export default SettingsMenu;
