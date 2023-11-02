import { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import { Todo } from '../assets/todos';
import styled from "styled-components";

type AddTodoProps = {
    onTodoItemChange: () => void;
};

export default function AddTodo({ onTodoItemChange }: AddTodoProps) {
    const [text, setText] = useState('');

    const changeText = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    const saveTodo = (event: FormEvent) => {
        event.preventDefault();
        if (text.trim() === '') {
            return;
        }
        axios
            .post('/api/todo', {
                description: text,
                status: 'OPEN',
            } as Todo)
            .then(onTodoItemChange);
        setText('');
    };

    return (
        <StyledFormContainer onSubmit={saveTodo}>
            <StyledInput type="text" placeholder="Beschreibung" value={text} onChange={changeText} />
            <StyledButton type="submit">Speichern</StyledButton>
        </StyledFormContainer>
    );
}

const StyledFormContainer = styled.form`
  display: block;
  text-align: center;
`;

const StyledInput = styled.input`
    display: block;
    margin: 0 auto 10px;
    padding: 8px;
    width: 100%;
    border: 1px solid #ccc;
`;

const StyledButton = styled.button`
    display: block;
    margin: 0 auto;
    padding: 8px;
    width: 100%;
    border: none;
    background-color: #4CAF50;
    color: white;
    cursor: pointer;

    &:hover {
        background-color: #45a049;
    }
`;