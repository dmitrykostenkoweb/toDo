import React, { useState } from "react";
import AddListBtn from "./addListBtn/AddListBtn";
import "./Sidebar.scss";
import labelIcon from "../assets/img/sidebar-label-icon.svg";
import close from "../assets/img/close.svg";

const Sidebar = ({ sidebar, colors, addItem, removeItem }) => {
  const list = sidebar;
  const [selectedItem, setSelectedItem] = useState(false);
  const [visibleTasks, setVisibleTasks] = useState(true);

  const elements = list.map((item) => {
    const { id, label } = item;
    const ellipseStyle = {
      backgroundColor: `${item.color}`,
    };

    let classNameList = "sidebar__list";
    if (selectedItem === id) {
      classNameList += " sidebar-item__active";
    }

    let classNameClose = "sidebar__list-item__close";
    if (selectedItem === id) {
      classNameClose += " close__active";
    }

    return (
      <div
        key={id}
        onClick={() => setSelectedItem(id)}
        className={classNameList}
      >
        <div style={ellipseStyle} className="ellipse"></div>
        <span className="sidebar__list-item__label">{label}</span>
        <img
          onClick={() => removeItem(id)}
          className={classNameClose}
          src={close}
          alt=""
        />
      </div>
    );
  });

  return (
    <div className="sidebar">
      <div className="sidebar__wrapper">
        <div
          onClick={() => {
            setVisibleTasks(!visibleTasks);
          }}
          className="sidebar__label"
        >
          <img className="sidebar__label-icon" src={labelIcon} alt="" />
          <span className="sidebar-label-text">All tasks</span>
        </div>

        {visibleTasks && <div>{elements}</div>}

        <AddListBtn addItem={addItem} colors={colors} />
      </div>
    </div>
  );
};

export default Sidebar;
