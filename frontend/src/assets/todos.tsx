export type Todo = {
    id: number,
    description: string,
    status: TodoStatus,
}

export type TodoStatus = "OPEN" | "IN_PROGRESS" | "DONE"

export const allPossibleStatus: TodoStatus[] = ['OPEN', 'IN_PROGRESS', 'DONE']
