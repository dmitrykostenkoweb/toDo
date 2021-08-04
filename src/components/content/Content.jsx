import React from "react";
import axios from "axios";

import AddTaskForm from './AddTaskForm/AddTaskForm'

import editButton from "../../assets/img/edit-button.svg";
import "./Content.scss";

const Content = ({ tasks, onEditTitle }) => {
  if (!tasks) return null;

  const editTitle = () => {
    const newLabel = window.prompt("Name of list:", tasks.label);
    if (newLabel) {
      onEditTitle(tasks.id, newLabel);
    }
    axios
      .patch(" http://localhost:3001/lists/" + tasks.id, {
        label: newLabel,
      })
      .catch(() => {
        alert("failed to write list name");
      });
  };

  const headerLabelColor = {
    color: `${tasks.color}`,
  };

  const elements = tasks.tasks.map((item) => {
    const { id, completed, text } = item;

    return (
      <div key={id} className="tasks__items">
        <div className="checkbox">
          <input checked={completed} id={`task-${id}`} type="checkbox" />

          <label htmlFor={`task-${id}`}>
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
        <span>{text}</span>
      </div>
    );
  });

  return (
    <div className="content">
      <div className="header-wrapper">
        <div className="header-inner">
          <h2 style={headerLabelColor} className="header-label">
            {tasks.label}
          </h2>
          <div className="header-edit-button">
            <img onClick={editTitle} src={editButton} alt="" />
          </div>
        </div>
        <div className="line"></div>
      </div>
      <div className="tasks">
        {!tasks.tasks.length && <h2>No Tasks</h2>}
        {elements}
      </div>
      <AddTaskForm/>
    </div>
  );
};

export default Content;
