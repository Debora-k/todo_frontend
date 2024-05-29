import React from "react";
import TodoItem from "./TodoItem";

// can add Redux here
const TodoBoard = ({index, todoList, deleteItem, toggleComplete }) => {
  return (
    <div>
      <h2>Todo List</h2>
      {todoList.length > 0 &&
      //over 0 means more than one in the list 
      //using map, bring the item and that will be in item of TodoItem
        todoList.map((item) => 
          <TodoItem 
            item={item}
            key={index}
            deleteItem={deleteItem}
            toggleComplete={toggleComplete}
        />
      )}
    </div>
    );
};
export default TodoBoard;
