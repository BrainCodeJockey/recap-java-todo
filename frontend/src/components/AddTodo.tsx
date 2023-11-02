import {ChangeEvent, useState} from "react";
import axios from "axios";
import {Todo} from "../assets/todos.tsx";

type AddTodoProps = {
    onTodoItemChange: () => void,
}

export default function AddTodo(props: AddTodoProps) {
    const [text, setText] = useState("");

    function changeText(event: ChangeEvent<HTMLInputElement>) {
        setText(event.target.value)
    }

    function saveTodo() {
        if(text.trim() === "") {
            return;
        }
        axios.post('/api/todo',
            {
                description: text,
                status: "OPEN",
            } as Todo)
            .then(props.onTodoItemChange)
        setText("");
    }

    return (
      <form onSubmit={saveTodo}>
          <input type="text" placeholder={"Beschreibung"} value={text} onInput={changeText}/>
          <button>Speichern</button>
      </form>
    );
}