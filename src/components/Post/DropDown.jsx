import React, { useRef } from "react";

const DropDown = ({ handleDelete, setIsEditMode }) => {
  const checkboxRef = useRef();

  return (
    <label className="popup">
      <input ref={checkboxRef} type="checkbox" />
      <div className="burger" tabindex="0">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav className="popup-window">
        <legend>Eylemler</legend>
        <ul>
          <li>
            <button
              onClick={() => {
                setIsEditMode(true);
                checkboxRef.current.checked = false;
              }}
            >
              <img src="/edit.svg" />
              <span>Düzenle</span>
            </button>
          </li>
          <hr />
          <li>
            <button onClick={handleDelete}>
              <img src="/delete.svg" />
              <span>Sil</span>
            </button>
          </li>
        </ul>
      </nav>
    </label>
  );
};

export default DropDown;
