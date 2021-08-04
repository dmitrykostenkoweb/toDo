import React from "react";

import "./AddTaskForm.scss";

import plus from "../../../assets/img/plus.svg";

function AddTaskForm() {
  return (
    <div>
      <div className="add-tasks__form">
        <div className="add-tasks__form-new">
          <img src={plus} alt="" />
          <span>New Task</span>
        </div>
        <div className="add-tasks__form-active">
          <input 
          className="add-tasks__form-active-input" 
          type="text"
          placeholder=' You Task...' />

          <div className="add-tasks__form-active-btns">
            <button className="add-tasks__form-active__addBtn">
              Add Task
              {/* {isLoading ? 'Adding Task..': 'Add Task'} */}
            </button>
            <button className="add-tasks__form-active__cancelBtn">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTaskForm;
