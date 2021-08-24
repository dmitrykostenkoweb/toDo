import React from "react";
import axios from "axios";

import AddTaskForm from "./AddTaskForm/AddTaskForm";

import editButton from "../../assets/img/edit-button.svg";
import "./Content.scss";
import Task from "./AddTaskForm/task/Task";

const Content = ({
  tasks,
  onEditTitle,
  addTask,
  setIds,
  onEditTask,
  setLists,
  onCompleteTask,
  setToggleConfirm
}) => {
  if (!tasks) return null;

  const editTitle = () => {
    const newLabel = window.prompt("Name of list:", tasks.label);
    if (!newLabel) {
      return;
    }
    if (newLabel) {
      onEditTitle(tasks.id, newLabel);
    }
    axios
      .patch(" https://kost-todo.herokuapp.com/api/lists/" + tasks.id, {
        label: newLabel,
      })
      .catch(() => {
        alert("failed to write list name");
      });
  };

  const headerLabelColor = {
    color: `${tasks.color}`,
  };

  return (
    <div className="content">

      <div className="header-wrapper">
        <div className="header">
          <h2 style={headerLabelColor} className="header-label">
            {tasks.label}
          </h2>
          <div className="edit-button">
            <img onClick={editTitle} src={editButton} alt="" />
          </div>
        </div>
        <div className="line"></div>
      </div>
      <Task
        onCompleteTask={onCompleteTask}
        onEditTask={onEditTask}
        setIds={setIds}
        setToggleConfirm={setToggleConfirm}
        tasks={tasks}
      />
      <AddTaskForm
        key={tasks.id}
        setLists={setLists}
        tasks={tasks}
        addTask={addTask}
      />
    </div>
  );
};

export default Content;
