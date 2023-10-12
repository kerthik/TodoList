import React, { useState, useContext, useEffect } from 'react';
import { Credentialcontext } from '../App';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [todotext, setTodotext] = useState('');
  const [credential] = useContext(Credentialcontext);
  const [filter, setFilter] = useState('uncompleted');

  const persist = (newtodos) => {
    fetch('http://localhost:4000/todolist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credential.username}:${credential.password}`,
      },
      body: JSON.stringify(newtodos),
    });
  };

  useEffect(() => {
    fetch('http://localhost:4000/todolist', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${credential.username}:${credential.password}`,
      },
    })
      .then((response) => response.json())
      .then((todos) => setTodos(todos));
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    if (!todotext) return;
    const newTodo = { checked: false, text: todotext };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setTodotext('');
    persist(newTodos);
  };

  const toggleComplete = (id) => {
    const newTodoList = todos.map((todo) => {
      if (todo._id === id) {
        return { ...todo, checked: !todo.checked };
      }
      return todo;
    });

    setTodos(newTodoList);
    persist(newTodoList);
  };

  const getFilteredTodos = () => {
    return todos.filter((todo) =>
      filter === 'completed' ? todo.checked : !todo.checked
    );
  };

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div>
      <select value={filter} onChange={(e) => changeFilter(e.target.value)}>
        <option value="completed">Completed</option>
        <option value="uncompleted">Uncompleted</option>
      </select>
      <form onSubmit={addTodo}>
        <input onChange={(e) => setTodotext(e.target.value)} type="text" value={todotext} />
        <button type="submit">Add</button>
      </form>
      <br />
      {getFilteredTodos().map((todo) => (
        <div key={todo._id}>
          <input
            checked={todo.checked}
            type="checkbox"
            onChange={() => toggleComplete(todo._id)}
          />
          <label>{todo.text}</label>
        </div>
      ))}
      <br />
    </div>
  );
};

export default Todos;
