export interface Asignatura {
  strNombre: string;
}

export interface Task {
  id: number;
  name: string;
  completed: boolean;
  end_date: string;
  asignatura: string;
}

export interface User {
  profileImageUrl?: string;
  name: string;
}
export interface ChatData {
  friendId: string;
}
