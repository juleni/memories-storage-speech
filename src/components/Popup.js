import React from "react";
import "./Popup.css";
export const Popup = ({ text, closePopup }) => {
  return (
    <div className="popup-container">
      <div className="popup-body">
        <h1 className="popup-title">MEMORIES v 1.0</h1>
        <div>
          A simple React application for storing memories. Memories are stored
          in LocalStorage and then can be exported to the file. Memories are
          displayed in a table and timeline.
        </div>
        <div className="popup-contact">
          2023{" "}
          <a
            href="https://juleni.github.io/portfolio/"
            target={"_blank"}
            rel="noreferrer"
            className="popup-link"
          >
            JULENI
          </a>{" "}
          See my{" "}
          <a
            href="https://github.com/juleni"
            target={"_blank"}
            rel="noreferrer"
            className="popup-link popup-github"
          >
            GitHub pages
          </a>{" "}
        </div>
      </div>
    </div>
  );
};
