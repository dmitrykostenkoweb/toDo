import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";
import Sidebar from "../sidebar/Sidebar";
import Content from "../content/Content";

function App() {
  const colors = [
    { color: "#C9D1D3" },
    { color: "#42B883" },
    { color: "#64C4ED" },
    { color: "#FFBBCC" },
    { color: "#B6E6BD" },
    { color: "#C355F5" },
    { color: "#09011A" },
    { color: "#FF6464" },
  ];
  const [lists, setLists] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    axios.get(" http://localhost:3001/lists?_embed=tasks").then(({ data }) => {
      setLists(data);
    });
  }, []);

  const addItem = (newItem) => {
    const newArr = [...lists, newItem];
    setLists(newArr);
  };
  const addTask = (listId, newTaskObj) => {
    const newArr = lists.map((item) => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, newTaskObj];
      }
      return item;
    });
    setLists(newArr);
  };

  const removeItem = (id) => {
    const index = lists.findIndex((elem) => elem.id === id);
    const before = lists.slice(0, index);
    const after = lists.slice(index + 1);
    const newArr = [...before, ...after];
    setLists(newArr);
  };

  const onEditListTitle = (id, label) => {
    console.log(`${id}, ${label}`);
    const newArr = lists.map((item) => {
      if (item.id === id) {
        item.label = label;
      }
      return item;
    });
    setLists(newArr);
  };
  return (
    <div className="todo">
      <Sidebar
        list={lists}
        addItem={addItem}
        removeItem={removeItem}
        colors={colors}
        className="todo__sidebar"
        onClickItem={(item) => setActiveItem(item)}
        activeItem={activeItem}
      />

      <Content
        onEditTitle={onEditListTitle}
        tasks={activeItem}
        addTask={addTask}
        className="todo__content"
      />
    </div>
  );
}

export default App;
// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       sidebarListItems: [
//         { label: "Shops", color: "#42B883", id: 0 },
//         { label: "Frontend", color: "#64C4ED", id: 1 },
//         { label: "Films", color: "#FFBBCC", id: 2 },
//         { label: "Books", color: "#B6E6BD", id: 3 },
//         { label: "Other", color: "#C9D1D3", id: 4 },
//       ],
//     };
//     this.colors = [
//       { color: "#C9D1D3" },
//       { color: "#42B883" },
//       { color: "#64C4ED" },
//       { color: "#FFBBCC" },
//       { color: "#B6E6BD" },
//       { color: "#C355F5" },
//       { color: "#09011A" },
//       { color: "#FF6464" },
//     ];
//     this.addItem = this.addItem.bind(this);
//     this.removeItem = this.removeItem.bind(this);
//   }
// componentDidMount() {
//   axios.get(" http://localhost:3001/lists?_embed=tasks").then(({ data }) => {
//     console.log(data);
//     this.setState({ sidebarListItems: data });
//     console.log("componentDidMount");
//   });
// }

// addItem(newItem) {
//   this.setState(({ sidebarListItems }) => {
//     const newArr = [...sidebarListItems, newItem];

//     return {
//       sidebarListItems: newArr,
//     };
//   });
// }

// removeItem(id) {
//   this.setState(({ sidebarListItems }) => {
//     const index = sidebarListItems.findIndex((elem) => elem.id === id);

//     const before = sidebarListItems.slice(0, index);
//     const after = sidebarListItems.slice(index + 1);

//     const newArr = [...before, ...after];
//     return {
//       sidebarListItems: newArr,
//     };
//   });
// }

//   render() {
//     return (
//       <div className="todo">
//         <Sidebar
//           addItem={this.addItem}
//           removeItem={this.removeItem}
//           colors={this.colors}
//           sidebar={this.state.sidebarListItems}
//           className="todo__sidebar"
//         />

//         <Content list={this.state.sidebarListItems} className="todo__content" />
//       </div>
//     );
//   }
// }
