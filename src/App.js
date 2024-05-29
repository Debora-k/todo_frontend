import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoBoard from "./components/TodoBoard";
import { useEffect, useState } from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import api from "./utils/api";
import { toHaveStyle } from "@testing-library/jest-dom/dist/matchers";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");


  const toggleComplete = async(id) => {
    try {
      const task = todoList.find((item) => item._id === id);
      const response = await api.put(`/tasks/${id}`, {
        isComplete: !task.isCompelete,
      });
      if (response.status === 200) {
        getTasks();
      } 
    } catch (error) {
      console.log("error", error);
    }
  };

  const deleteItem = async(id) => {
    try{
      console.log(id);
      const response = await api.delete(`/tasks/${id}`);
      if (response.status === 200) {
        getTasks();
      }
    } catch (error) {
      console.log("error", error);
    };
  };


  const getTasks = async() =>{
    const response = await api.get('/tasks');
    console.log("display response", response);
    setTodoList(response.data.data);
  };

  const addTask = async () => {
    try {
      const response = await api.post('/tasks', { 
        task:todoValue, 
        isComplete:false,
      });
      if (response.status === 200) {
        console.log("success!");
        //1. 입력한 값이 안사라짐
        setTodoValue("");
        //2. 추가한 값이 안보임 (추가 후 바로 안뜨고 새로고침하면 뜸)
        getTasks();
      } else {
        throw new Error("task can not be added");
      }
    } catch(err) {
      console.log("error", err);
    };
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="Add a to-do here"
            className="input-box"
            value={todoValue}
            //onChange + event 
            //by using event.target.value, it reads changes
            onChange={(event) => setTodoValue(event.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>Add</button>
        </Col>
      </Row>

      <TodoBoard 
      todoList={todoList}
      deleteItem={deleteItem}
      toggleComplete={toggleComplete}
      />
      
  
    </Container>
  );
}

export default App;
