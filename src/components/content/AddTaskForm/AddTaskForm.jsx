import React, { useState } from "react";
import axios from "axios";

import "./AddTaskForm.scss";

import plus from "../../../assets/img/plus.svg";

function AddTaskForm({ tasks, addTask }) {
  const [visibleForm, setVisibleForm] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toggleFormVisible = () => {
    setVisibleForm(!visibleForm);
    setInputValue("");
  };
  const onAddTask = () => {
    const newTaskObj = {
      listId: tasks.id,
      text: inputValue,
      completed: false,
    };
    setIsLoading(true);
    axios
      .post("https://kost-todo.herokuapp.com/api/tasks/", newTaskObj)
      .then(({ data }) => {
        addTask(tasks.id, newTaskObj);
        toggleFormVisible();
      })
      .catch(() => {
        alert("error while adding task");
      })
      .finally(() => {
   
        setIsLoading(false);
      });
  };


  return (
    <div className="add-tasks__form">
      {!visibleForm ? (
        <div className="add-tasks__form-new" onClick={toggleFormVisible}>
          <img src={plus} alt="" />
          <span>New Task</span>
        </div>
      ) : (
        <div className="add-tasks__form-active">
          <input
            className="add-tasks__form-active-input"
            type="text"
            placeholder=" You Task..."
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />

          <div className="add-tasks__form-active-btns">
            <button
            disabled = {isLoading}
              onClick={onAddTask}
              className="add-tasks__form-active__addBtn"
            >
              {isLoading ? "Adding Task.." : "Add Task"}
            </button>
            <button
              onClick={toggleFormVisible}
              className="add-tasks__form-active__cancelBtn"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddTaskForm;
