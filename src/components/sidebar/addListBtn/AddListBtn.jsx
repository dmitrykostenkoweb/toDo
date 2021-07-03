import React, { useState } from "react";
import plus from "../../assets/img/plus.svg";
import "./AddListBtn.scss";
import closeFull from "../../assets/img/close-full.svg";

const AddListBtn = ({ colors, addItem }) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0].color);
  const [inputValue, setInputValue] = useState("");


  const addList = () => {
    if (!inputValue) {
      alert("Enter the name of the list");
      return;
    }
    addItem({ label: inputValue, color: selectedColor, id: Math.random() });
  };

  const colorsBtn = colors.map((item) => {
    const backBtnColor = {
      backgroundColor: `${item.color}`,
    };

    let clazzName = "add-list-popup__color-btn";
    if (selectedColor === item.color) {
      clazzName += "  add-list-popup__active";
    }

    return (
      <button
        key={item.color}
        onClick={() => setSelectedColor(item.color)}
        className={clazzName}
        style={backBtnColor}
      ></button>
    );
  });

  return (
    <>
      <div className="add-list-btn">
        <button
          onClick={() => setVisiblePopup(!visiblePopup)}
          className="add-list-btn__button"
        >
          <img src={plus} alt="" />
          Add folder
        </button>
      </div>

      {visiblePopup && (
        <div className="add-list-popup">
          <button
            onClick={() => setVisiblePopup(false)}
            className="add-list-popup__close-btn"
          >
            <img src={closeFull} alt="" />
          </button>
          <input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            className="add-list-popup__input"
            type="text"
            placeholder="Folder Name"
          />
          <div className="add-list-popup__color-btn__wrapper">{colorsBtn}</div>
          <button onClick={()=>{
addList();

          }} className="add-list-popup__add-btn">
            Add
          </button>
        </div>
      )}
    </>
  );
};

export default AddListBtn;
