import React, { useState, useRef, useEffect } from "react";

import AddListBtn from "./addListBtn/AddListBtn";
import "./Sidebar.scss";
import labelIcon from "../../assets/img/sidebar-label-icon.svg";
import folder from "../../assets/img/folders.svg";
import remove from "../../assets/img/close.svg";
import closeFull from "../../assets/img/close-full.svg";

const Sidebar = ({
  list,
  colors,
  addItem,
   onClickItem,
  activeItem,
  setActiveAllTasks,
  activeAllTasks,
  setLists,
  setToggleConfirm,
  setIds
}) => {
  const [showFolders, setShowFolders] = useState(false);
  // const ref = useRef(null);

  // const handleClickOutside = (event) => {
  //   if (ref.current && !ref.current.contains(event.target)) {
  //     setShowFolders(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("click", handleClickOutside, true);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside, true);
  //   };
  // });

  if (!list) return null;

  const onClickAllTask = () => {
    setActiveAllTasks(!activeAllTasks);
  };

  const elements = list.map((item) => {
    const { id, label, color } = item;
    const circleStyle = {
      backgroundColor: `${color}`,
    };

    let classNameList = "sidebar__item";
    if (activeItem && activeItem.id === id && activeAllTasks === false) {
      classNameList += " sidebar__item-active";
    }

    let classNameRemove = "sidebar__item-remove";
    if (activeItem && activeItem.id === id && activeAllTasks === false) {
      classNameRemove += " sidebar__item-remove__active";
    }

    return (
      <div
        key={id}
        onClick={onClickItem ? () => onClickItem(item) : null}
        className={classNameList}
      >
        <div style={circleStyle} className="circle">
          {item.tasks && `${item.tasks.length}`}
        </div>

        <div title={label} className="sidebar__item-text">
          {label}
        </div>

        <img
          onClick={() => {
            setIds(id);
            onClickAllTask();
            setToggleConfirm(true)
          }}
          className={classNameRemove}
          src={remove}
          alt=""
        />
      </div>
    );
  });

  return (
    <div className="sidebar">
      {/* All tasks */}
      <div
        onClick={onClickAllTask}
        className={
          !activeAllTasks
            ? "sidebar__item"
            : "sidebar__item sidebar__item-active"
        }
      >
        <img src={labelIcon} alt="" />
        <span className="sidebar__item-text">All tasks </span>
      </div>

      {/* Hide/Show folders */}
      <div
        onClick={() => {
          setShowFolders(!showFolders);
        }}
        className={
          !showFolders
            ? "sidebar__item hideShowFolderBtn  "
            : "sidebar__item hideShowFolderBtn sidebar__item-active"
        }
      >
        <img src={folder} alt="" />
        <span>{showFolders ? "Hide folders" : "Show folders"}</span>
      </div>

      {/* ___________ */}

      <div
        // ref={ref}
        className={
          showFolders
            ? "sidebar__items  sidebar__items-active "
            : "sidebar__items"
        }
      >
        <button
          onClick={() => setShowFolders(false)}
          className="
          sidebar__items__close-btn
          add-list-popup__close-btn"
        >
          <img src={closeFull} alt="" />
        </button>
        {elements}
      </div>

      {/* ___________ */}

      <AddListBtn setLists={setLists} addItem={addItem} colors={colors} />

      {/* ___________ */}
    </div>
  );
};

export default Sidebar;
