import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a Todo App', completed: false },
    { id: 3, text: 'Write Tests', completed: false }
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      const newTodoItem = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const getFilteredTodos = () => {
    switch(filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const filteredTodos = getFilteredTodos();
  const activeTodosCount = todos.filter(t => !t.completed).length;
  const completedTodosCount = todos.filter(t => t.completed).length;

  return (
    <div className="todo-container">
      <h2>Todo List</h2>
      
      <form onSubmit={addTodo} className="add-todo-form" data-testid="add-todo-form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          data-testid="todo-input"
          className="todo-input"
        />
        <button 
          type="submit" 
          data-testid="add-button"
          className="add-btn"
          disabled={!newTodo.trim()}
        >
          Add Todo
        </button>
      </form>

      <div className="filter-controls" data-testid="filter-controls">
        <button 
          onClick={() => setFilter('all')}
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          data-testid="filter-all"
        >
          All ({todos.length})
        </button>
        <button 
          onClick={() => setFilter('active')}
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          data-testid="filter-active"
        >
          Active ({activeTodosCount})
        </button>
        <button 
          onClick={() => setFilter('completed')}
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          data-testid="filter-completed"
        >
          Completed ({completedTodosCount})
        </button>
      </div>

      <ul className="todo-list" data-testid="todo-list">
        {filteredTodos.length === 0 ? (
          <li className="empty-message" data-testid="empty-message">
            No todos found
          </li>
        ) : (
          filteredTodos.map(todo => (
            <li 
              key={todo.id} 
              className={`todo-item ${todo.completed ? 'completed' : ''}`}
              data-testid={`todo-item-${todo.id}`}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                data-testid={`toggle-${todo.id}`}
                className="todo-checkbox"
              />
              <span 
                className="todo-text"
                onClick={() => toggleTodo(todo.id)}
                data-testid={`todo-text-${todo.id}`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                data-testid={`delete-${todo.id}`}
                className="delete-btn"
                aria-label="Delete todo"
              >
                ×
              </button>
            </li>
          ))
        )}
      </ul>

      <div className="todo-stats" data-testid="todo-stats">
        <span>Total: {todos.length}</span>
        <span>Active: {activeTodosCount}</span>
        <span>Completed: {completedTodosCount}</span>
      </div>
    </div>
  );
};

export default TodoList;