import React from "react";

import "./Confirm.scss";

const Remove = ({ setToggleConfirm, answerYes }) => {
  return (
    <>
      <div className="remove__wrapper">
        <span className="remove-label">Are you sure?</span>
        <div className="remove-btns__wrapper">
          <button onClick={() => answerYes()} className="remove-btn btn-yes">
            Yes
          </button>
          <button
            onClick={() => setToggleConfirm(false)}
            className="remove-btn btn-no "
          >
            No
          </button>
        </div>
      </div>
    </>
  );
};

export default Remove;
