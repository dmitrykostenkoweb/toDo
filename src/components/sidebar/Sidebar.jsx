import React, { useState } from "react";

import AddListBtn from "./addListBtn/AddListBtn";
import "./Sidebar.scss";
import labelIcon from "../../assets/img/sidebar-label-icon.svg";
import folder from "../../assets/img/folders.svg";
import close from "../../assets/img/close.svg";

const Sidebar = ({
  list,
  colors,
  addItem,
  removeItem,
  onClickItem,
  activeItem,
  setActiveAllTasks,
  activeAllTasks,
  setLists,
}) => {
  const [showFolders, setShowFolders] = useState(false);

  if (!list) return null;

  const onClickAllTask = () => {
    setActiveAllTasks(!activeAllTasks);
  };

  const elements = list.map((item) => {
    const { id, label, color } = item;
    const ellipseStyle = {
      backgroundColor: `${color}`,
    };

    let classNameList = "sidebar__list";
    if (activeItem && activeItem.id === id && activeAllTasks === false) {
      classNameList += " sidebar-item__active";
    }

    let classNameClose = "sidebar__list-item__close";
    if (activeItem && activeItem.id === id && activeAllTasks === false) {
      classNameClose += " close__active";
    }

    return (
      <div
        key={id}
        onClick={onClickItem ? () => onClickItem(item) : null}
        className={classNameList}
      >
        <div style={ellipseStyle} className="ellipse">
          {item.tasks && `${item.tasks.length}`}
        </div>
        <div title={label} className="sidebar__list-item__label">
          {label}
        </div>
        <img
          onClick={() => {
            removeItem(id);
            onClickAllTask();
          }}
          className={classNameClose}
          src={close}
          alt=""
        />
      </div>
    );
  });

  let foldersStyle = "sidebar__element";
  if (showFolders === true) {
    foldersStyle += " sidebar__element__active";
  }

  return (
    <div className="sidebar">
      <div className="sidebar__wrapper">
        <div
          onClick={onClickAllTask}
          className={
            !activeAllTasks
              ? "sidebar__label"
              : "sidebar__label sidebar-item__active"
          }
        >
          <img src={labelIcon} alt="" />
          <span>All tasks </span>
        </div>
        <div
          onClick={() => {
            setShowFolders(!showFolders);
          }}
          className={
            !showFolders
              ? "sidebar__label sidebar-btn  "
              : "sidebar__label sidebar-btn sidebar-btn__active"
          }
        >
          <img className="sidebar-btn__img" src={folder} alt="" />
          <span>{showFolders ? "Hide folders" : "Show folders"}</span>
        </div>

        <div className={foldersStyle}>{elements}</div>
        <AddListBtn setLists={setLists} addItem={addItem} colors={colors} />
      </div>
    </div>
  );
};

export default Sidebar;
