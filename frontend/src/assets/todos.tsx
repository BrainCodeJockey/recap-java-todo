export type Todo = {
    id: number,
    description: string,
    status: TodoStatus,
}

export type TodoStatus = "OPEN" | "IN_PROGRESS" | "DONE"

export const allPossibleStatus: TodoStatus[] = ['OPEN', 'IN_PROGRESS', 'DONE']

export function translateStatus(status: TodoStatus): string {
    switch (status) {
        case 'OPEN':
            return 'Offen';
        case 'IN_PROGRESS':
            return 'In Bearbeitung';
        case 'DONE':
            return 'Erledigt';
        default:
            return status;
    }
}