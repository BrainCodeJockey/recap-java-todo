import {Todo, TodoStatus} from "../assets/todos.tsx";
import TodoCard from "./TodoCard.tsx";

type TodoColumnProps = {
    todos: Todo[],
    status: TodoStatus,
    onTodoItemChange: () => void

}
export default function TodoColumn(props: TodoColumnProps) {
    return (<>

            <section>

                <h2>{props.status.toLowerCase()}</h2>

                {
                    props.todos.map(todo =>
                        <TodoCard
                            todo={todo}
                            key={todo.id}
                            onTodoItemChange={props.onTodoItemChange}/>)
                }
            </section>
        </>
    );
}