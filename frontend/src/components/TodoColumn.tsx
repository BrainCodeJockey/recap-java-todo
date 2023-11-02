import {Todo, TodoStatus, translateStatus} from "../assets/todos.tsx";
import TodoCard from "./TodoCard.tsx";
import styled from 'styled-components';


type TodoColumnProps = {
    todos: Todo[],
    status: TodoStatus,
    onTodoItemChange: () => void

}
export default function TodoColumn(props: TodoColumnProps) {
    return (<>

            <TodoColumnContainer>
                <StyleHeader>{translateStatus(props.status)}</StyleHeader>
                {
                    props.todos.map(todo =>
                        <TodoCard
                            todo={todo}
                            key={todo.id}
                            onTodoItemChange={props.onTodoItemChange}/>)
                }
            </TodoColumnContainer>
        </>
    );
}

const TodoColumnContainer = styled.section`
  flex: 1;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
`;

const StyleHeader = styled.h2`
    text-align: center;
`;
