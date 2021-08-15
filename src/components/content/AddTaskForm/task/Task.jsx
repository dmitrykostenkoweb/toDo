import React from "react";
import axios from "axios";

import editButton from "../../../../assets/img/edit-button.svg";
import close from "../../../../assets/img/close.svg";

import "./Task.scss";

function Task({ tasks, onRemoveTask, onEditTask, onCompleteTask }) {
  if (!tasks.tasks) return null;
  

  const elements = tasks.tasks.map((item) => {
    const { id, completed, text, listId } = item;

    const onChangeCheckbox = (event) => {
      onCompleteTask(listId, id, event.target.checked);
    };

    return (
      <div key={id} className="tasks__items">
        <div className="checkbox">
          <input
            onChange={onChangeCheckbox}
            id={`task-${id}`}
            type="checkbox"
            checked={completed}
          />

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
        <span className="tasks-text">{text}</span>

        <div className="tasks-actions">
          <div
            onClick={() => onEditTask(listId, { id, text })}
            className="edit-button"
          >
            <img src={editButton} alt="" />
          </div>
          <div onClick={() => onRemoveTask(listId, id)}>
            <img className="close-btn" src={close} alt="" />
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="tasks">
        {!tasks.tasks.length && <h2>No Tasks</h2>}
        {elements}
      </div>
    </div>
  );
}

export default Task;
