import React, { Component } from "react";
import editButton from "../assets/img/edit-button.svg";
import "./Content.scss";

export default class Content extends Component {
  render() {
    return (
      <div className="content">
        <div className="header-wrapper">
          <div className="header-inner">
            <h2 className="header-label">Frontend</h2>
            <div className="header-edit-button">
              <img src={editButton} alt="" />
            </div>
          </div>
          <div className="line"></div>
        </div>
        <div className="tasks">
          <div className="tasks__items">
            <div className="checkbox">
              <input id="check" type="checkbox" />

              <label htmlFor="check">
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
            <span> Learn JavaScript</span>
          </div>
          <div className="tasks__items">
            <div className="checkbox">
              <input id="check" type="checkbox" />

              <label htmlFor="check">
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
            <span> Learn JavaScript</span>
          </div>
          <div className="tasks__items">
            <div className="checkbox">
              <input id="check" type="checkbox" />

              <label htmlFor="check">
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
            <span> Learn JavaScript</span>
          </div>
        </div>
      </div>
    );
  }
}
