import { Component } from "react";
import "./App.scss";
import Sidebar from "../sidebar/Sidebar";
import Content from "../content/Content";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarListItems: [
        { label: "Shops", color: "#42B883", id: 0,  },
        { label: "Frontend", color: "#64C4ED", id: 1 },
        { label: "Films", color: "#FFBBCC", id: 2 },
        { label: "Books", color: "#B6E6BD", id: 3 },
        { label: "Other", color: "#C9D1D3", id: 4 },
      ],
    };
    this.colors = [
      { color: "#C9D1D3" },
      { color: "#42B883" },
      { color: "#64C4ED" },
      { color: "#FFBBCC" },
      { color: "#B6E6BD" },
      { color: "#C355F5" },
      { color: "#09011A" },
      { color: "#FF6464" },
    ];
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  addItem(newItem) {
    this.setState(({ sidebarListItems }) => {
      const newArr = [...sidebarListItems, newItem];

      return {
        sidebarListItems: newArr,
      };
    });
  }

  removeItem(id) {
    this.setState(({ sidebarListItems }) => {
      const index = sidebarListItems.findIndex((elem) => elem.id === id);

      const before = sidebarListItems.slice(0, index);
      const after = sidebarListItems.slice(index + 1);

      const newArr = [...before, ...after];
      return {
        sidebarListItems: newArr,
      };
    });
  }

  render() {
    return (
      <div className="todo">
        <Sidebar
          addItem={this.addItem}
          removeItem={this.removeItem}
          colors={this.colors}
          sidebar={this.state.sidebarListItems}
          className="todo__sidebar"
        />

        <Content className="todo__content" />
      </div>
    );
  }
}
