import {useEffect, useState} from "react";
import {Todo, allPossibleStatus} from "./assets/todos.tsx";
import axios from "axios";
import TodoColumn from "./components/TodoColumn.tsx";
import AddTodo from "./components/AddTodo.tsx";
import styled from 'styled-components';

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  function getTodos() {
    axios.get('/api/todo')
        .then(response => {
          setTodos(response.data)
        })
        .catch(error => {
          console.log(error)
        })
  }

  useEffect(
      getTodos
      , []);

  if (!todos) {
    return <div>Loading...</div>
  }


    return (
        <StyledContainer>

            <StyledHeader>Was gibts zu Tun:</StyledHeader>

            <AddTodo onTodoItemChange={getTodos} />

            <GridWrapper>
                {allPossibleStatus.map((status) => {
                    const filteredTodos = todos.filter((todo) => todo.status === status);
                    return (
                        <TodoColumn
                            status={status}
                            todos={filteredTodos}
                            onTodoItemChange={getTodos}
                            key={status}
                        />
                    );
                })}
            </GridWrapper>

        </StyledContainer>
    );
}

const StyledContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
  width: 90%;
`;

const StyledHeader = styled.h1`
  font-size: 2rem;
  text-align: center;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  gap: 20px;
`;