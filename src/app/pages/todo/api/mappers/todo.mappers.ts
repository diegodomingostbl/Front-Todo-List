import { TodoDTO } from '../interfaces/todo.dto';
import { Todo } from '../interfaces/todo.interface';

export function fromTodoDTO(dto: TodoDTO): Todo {
  return {
    id: dto.id,
    description: dto.description ?? '',
    IsComplete: dto.done ?? false,
  };
}

export function toTodoDTO(dto: Todo): TodoDTO {
  return {
    id: dto.id ?? 0,
    description: dto.description ?? '',
    done: dto.IsComplete ?? false,
  };
}
