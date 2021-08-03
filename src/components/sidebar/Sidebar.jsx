import React, { useState } from "react";
import AddListBtn from "./addListBtn/AddListBtn";
import "./Sidebar.scss";
import labelIcon from "../../assets/img/sidebar-label-icon.svg";
import close from "../../assets/img/close.svg";

const Sidebar = ({
  list,
  colors,
  addItem,
  removeItem,
  onClickItem,
  activeItem,
}) => {
  const [visibleTasks, setVisibleTasks] = useState(true);
  if (!list) return null;

  console.log(list);

  const elements = list.map((item) => {
    const { id, label } = item;
    const ellipseStyle = {
      backgroundColor: `${item.color}`,
    };

    let classNameList = "sidebar__list";
    if (activeItem && activeItem.id === item.id) {
      classNameList += " sidebar-item__active";
    }

    let classNameClose = "sidebar__list-item__close";
    if (activeItem && activeItem.id === id) {
      classNameClose += " close__active";
    }

    return (
      <div
        key={id}
        onClick={onClickItem ? () => onClickItem(item) : null}
        className={classNameList}
      >
        <div style={ellipseStyle} className="ellipse"></div>
        <div className="sidebar__list-item__label">
          {label}
          {item.tasks && ` (${item.tasks.length})`}
        </div>
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
