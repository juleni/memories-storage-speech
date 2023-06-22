import React, { useState } from "react";
import "./Header.css";
import { Popup } from "./Popup";

function Header() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal((showModal) => !showModal);
  };

  return (
    <div className="header">
      <div className="title">
        <label>M E M O R I E S</label>
      </div>
      <div onClick={openModal}>
        <label className="about">About</label>
        {showModal ? (
          <Popup text="Hello there!" closePopup={openModal} />
        ) : null}
      </div>
    </div>
  );
}

export default Header;
