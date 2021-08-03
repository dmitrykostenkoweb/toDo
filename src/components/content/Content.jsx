import React from "react";
import editButton from "../../assets/img/edit-button.svg";
import "./Content.scss";

const Content = ({ tasks, activeItem }) => {
  if (!tasks) return null;


  const element = tasks.tasks.map((task) => (
    <div key={task.id} className="tasks__items">
      <div className="checkbox">
        <input
          checked={task.completed}
          id={`task-${task.id}`}
          type="checkbox"
        />

        <label htmlFor={`task-${task.id}`}>
          <svg
            width="11"
            height="8"
            viewBox="0 0 11 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </label>
      </div>
      <span>{task.text}</span>
    </div>
  ));

  return (
    <div className="content">
      <div className="header-wrapper">
        <div className="header-inner">
          <h2 className="header-label">{tasks.label}</h2>
          <div className="header-edit-button">
            <img src={editButton} alt="" />
          </div>
        </div>
        <div className="line"></div>
      </div>
      <div className="tasks">
        {!tasks.tasks.length && <h2>No Tasks</h2>}
        {element}
      </div>
    </div>
  );
};

export default Content;
