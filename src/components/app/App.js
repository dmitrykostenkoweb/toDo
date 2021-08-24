import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";
import Sidebar from "../sidebar/Sidebar";
import Content from "../content/Content";
import Spinner from "../Spinner/Spinner";
import Confirm from "../Confirm/Confirm";

function App() {
  const colors = [
    { color: "#C9D1D3" },
    { color: "#42B883" },
    { color: "#64C4ED" },
    { color: "#FFBBCC" },
    { color: "#B6E6BD" },
    { color: "#C355F5" },
    { color: "#fdbb2d" },
    { color: "#FF6464" },
  ];
  const [lists, setLists] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [activeAllTasks, setActiveAllTasks] = useState(true);
  const [ids, setIds] = useState(null);
  const [toggleConfirm, setToggleConfirm] = useState(false);
  useEffect(() => {
    axios
      .get("https://kost-todo.herokuapp.com/api/lists?_embed=tasks")
      .then(({ data }) => {
        setLists(data);
      });
  }, []);

  // addition

  const addItem = (newItem) => {
    const newArr = [...lists, newItem];
    setLists(newArr);
    setActiveAllTasks(true);
  };

  const addTask = (listId, newTaskObj) => {
    const newArr = lists.map((item) => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, newTaskObj];
      }
      return item;
    });
    setLists(newArr);
    axios
      .get("https://kost-todo.herokuapp.com/api/lists?_embed=tasks")
      .then(({ data }) => {
        setLists(data);
      });
    setActiveAllTasks(true);
  };

  /////////////////////////////////////////////////////////////////////////////////

  // removals
  const answerYes = () => {
    console.log(ids.toString.length);
    if (ids.toString.length === 0) {
      removeTask();
    } else {
      removeItem();
    }
    setToggleConfirm(false);
  };

  const removeTask = () => {
    const { listId, id } = ids;

    const newArr = lists.map((item) => {
      if (item.id === listId) {
        item.tasks = item.tasks.filter((task) => task.id !== id);
      }
      return item;
    });
    setLists(newArr);

    axios
      .delete(`https://kost-todo.herokuapp.com/api/tasks/${id}`)
      .catch(() => {
        alert("failed to delete task");
      });
  };

  const removeItem = () => {
    const id = ids;
    console.log(id);
    const index = lists.findIndex((elem) => elem.id === id);
    const before = lists.slice(0, index);
    const after = lists.slice(index + 1);
    const newArr = [...before, ...after];
    setLists(newArr);
    axios
      .delete("https://kost-todo.herokuapp.com/api/lists/" + id)
      .catch(() => {
        alert("error while deleting list");
      });
  };

  /////////////////////////////////////////////////////////////////////////////////
  // correction
  const onEditListTitle = (id, label) => {
    const newArr = lists.map((item) => {
      if (item.id === id) {
        item.label = label;
      }
      return item;
    });
    setLists(newArr);
  };

  const onEditTask = (listId, taskObj) => {
    const { text, id } = taskObj;
    console.log(listId + "|" + id + "|" + text);

    const newTaskText = window.prompt("...new text...", text);
    if (!newTaskText) {
      return;
    }
    const newArr = lists.map((item) => {
      if (item.id === listId) {
        item.tasks = item.tasks.map((task) => {
          if (task.id === id) {
            task.text = newTaskText;
          }
          return task;
        });
      }
      return item;
    });
    setLists(newArr);

    axios
      .patch(`https://kost-todo.herokuapp.com/api/tasks/${id}`, {
        text: newTaskText,
      })
      .catch(() => {
        alert("failed to rename");
      });
  };

  /////////////////////////////////////////////////////////////////////////////////

  // completion
  const onCompleteTask = (listId, taskId, completed) => {
    const newArr = lists.map((item) => {
      if (item.id === listId) {
        item.tasks = item.tasks.map((task) => {
          if (task.id === taskId) {
            task.completed = completed;
          }
          return task;
        });
      }
      return item;
    });
    setLists(newArr);

    axios
      .patch(`https://kost-todo.herokuapp.com/api/tasks/${taskId}`, {
        completed,
      })
      .catch(() => {
        alert("failed to rename");
      });
  };
  /////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="todo__wrapper">
      <div className="todo">
        {toggleConfirm && (
          <Confirm answerYes={answerYes} setToggleConfirm={setToggleConfirm} />
        )}

        <div className="app-sidebar">
          {lists ? (
            <Sidebar
              setLists={setLists}
              list={lists}
              addItem={addItem}
              removeItem={removeItem}
              colors={colors}
              className="todo__sidebar"
              onClickItem={(item) => {
                if (!item) {
                  setActiveItem(null);
                }
                setActiveItem(item);
                if (activeAllTasks === true) {
                  setActiveAllTasks(!activeAllTasks);
                }
              }}
              activeItem={activeItem}
              setActiveAllTasks={setActiveAllTasks}
              activeAllTasks={activeAllTasks}
              setToggleConfirm={setToggleConfirm}
              setIds={setIds}
            />
          ) : (
            <Spinner />
          )}
        </div>
        <div className="app-content">
          {!activeAllTasks ? (
            <Content
              tasks={activeItem}
              // _____
              setLists={setLists}
              setToggleConfirm={setToggleConfirm}
              // _____
              onEditTitle={onEditListTitle}
              setIds={setIds}
              onEditTask={onEditTask}
              addTask={addTask}
              onCompleteTask={onCompleteTask}
              // _____
              className="todo__content"
            />
          ) : (
            lists &&
            lists.map((list) => (
              <Content
                tasks={list}
                // _____
                setLists={setLists}
                setToggleConfirm={setToggleConfirm}
                // _____
                onEditTitle={onEditListTitle}
                setIds={setIds}
                onEditTask={onEditTask}
                addTask={addTask}
                onCompleteTask={onCompleteTask}
                // _____
                className="todo__content"
                key={list.id}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
