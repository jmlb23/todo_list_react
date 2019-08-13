import React from "react";
import ReactDOM from "react-dom";

const Todo = props => {
  const [state, setState] = React.useState({
    style: {
      textDecoration: "none"
    }
  });

  return (
    <>
      <p style={state.style}>{props.content}</p>
      <input
        type="checkbox"
        onChange={e => {
          const textS = e.target.checked ? "line-through" : "none";
          setState({
            style: {
              textDecoration: textS
            }
          });
        }}
      />
      <button onClick={() => props.delete(props.content)}>delete</button>
    </>
  );
};

const TodoList = props => {
  const list = props.elements;
  return (
    <>
      {list.map(p => (
        <Todo key={p} content={p} delete={props.delete} />
      ))}
    </>
  );
};

const App = props => {
  const [state, setState] = React.useState({ list: [] });
  const textInput = React.createRef();
  const deleteItem = x => {
    const el = state.list;
    setState({ list: el.filter(y => y !== x) });
  };
  return (
    <>
      <input type="text" ref={textInput} />
      <input
        style={{ display: "block", marginTop: "20px" }}
        value="Agregar"
        type="submit"
        onClick={x => {
          setState({ list: state.list.concat([textInput.current.value]) });
        }}
      />
      <TodoList elements={state.list} delete={deleteItem} />
    </>
  );
};
ReactDOM.render(<App />, document.querySelector("#element"));
