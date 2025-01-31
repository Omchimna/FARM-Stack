import React from 'react';
import TodoItem from './Todo';

function TodoListView(props) {
  const { todolist, onDelete } = props;

  if (todolist === null) { 
    return <p>Loading tasks...</p>;
  }

  if (todolist && todolist.length === 0) { 
    return <p>No tasks yet!</p>;
  }

  return (
    <div>
      <ul>
        {todolist.map((todo, index) => (
          <TodoItem key={index} todo={todo} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
}

export default TodoListView;
