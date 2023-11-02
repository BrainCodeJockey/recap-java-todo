import {Todo, TodoStatus} from "../assets/todos.ts";
import axios from "axios";
import {ChangeEvent, useState} from "react";
import styled from 'styled-components';

type TodoCardProps = {
    todo: Todo,
    onTodoItemChange: () => void
}

export default function TodoCard(props: TodoCardProps) {

    const [description, setDescription] = useState(props.todo.description);

    function deleteThisItem() {
        axios.delete("/api/todo/" + props.todo.id)
            .then(props.onTodoItemChange)
    }

    function changeText(event: ChangeEvent<HTMLInputElement>) {
        const newDescription = event.target.value;
        setDescription(newDescription);
        axios.put("/api/todo/"+props.todo.id, {
            ...props.todo,
            description: newDescription
        } as Todo)
            .then(props.onTodoItemChange)

    }

    function move(targetStatus: TodoStatus) {
        axios.put("/api/todo/" + props.todo.id, {
            ...props.todo,
            status: targetStatus,
        } as Todo)
            .then(props.onTodoItemChange)
    }
    return (
            <TodoCardContainer>

                <StyledHeader>{props.todo.description}</StyledHeader>

                <StyledInput type="text" value={description} onInput={changeText}/>

                <ButtonContainer status={props.todo.status}>
                {
                    props.todo.status === "OPEN"
                        ? <div></div>
                        : (
                            props.todo.status === "DONE"
                                ? <StyledButton onClick={() => move("IN_PROGRESS")}>◀</StyledButton>
                                : <StyledButton onClick={() => move("OPEN")}>◀</StyledButton>)
                }
                {
                    props.todo.status === "DONE"
                        ? <div></div>
                        : (
                            props.todo.status === "OPEN"
                                ? <StyledButton onClick={() => move("IN_PROGRESS")}>▶</StyledButton>
                                : <StyledButton onClick={() => move("DONE")}>▶</StyledButton>)
                }
                </ButtonContainer>

                <StyledButton onClick={deleteThisItem}>Delete</StyledButton>

            </TodoCardContainer>
    );
}

const ButtonContainer = styled.div<{ status: TodoStatus }>`
display: ${(props) => (props.status === 'IN_PROGRESS' ? 'flex' : 'block')};
  button {
    width: ${(props) => (props.status === 'IN_PROGRESS' ? '40%' : '90%')};
  }
`;

const TodoCardContainer = styled.article`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
`;

const StyledHeader = styled.p`
  font-family: "Comic Sans MS",serif;
  text-align: center;
`;

const StyledInput = styled.input`
  display: block;
  margin: 0 auto;
  width: 88%;
  padding: 8px;
  border: 1px solid #ccc;
`;

const StyledButton = styled.button`
  display: block;
  margin: 10px auto 0;
  padding: 8px;
  width: 90%;
  border: none;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;
