import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { TodoDTO } from '../interfaces/todo.dto';
import { Todo } from '../interfaces/todo.interface';
import { fromTodoDTO, toTodoDTO } from '../mappers/todo.mappers';
import { Observable, from } from 'rxjs';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root', // Use providedIn: 'root' para serviços Singleton
})
export class TodoService {
  constructor(private http: HttpClient) {}

  async create(description: string): Promise<Todo | null> {
    const url = `${environment.apiUrl}Todo`;
    const todoObj: TodoDTO = {
      id: 0,
      description: description,
      done: false,
    };

    try {
      const res = await lastValueFrom(this.http.post<TodoDTO>(url, todoObj));
      return fromTodoDTO(res);
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      return null;
    }
  }

  getAll(): Observable<TodoDTO[]> {
    const url = `${environment.apiUrl}Todo/GetAll`;
    return this.http.get<TodoDTO[]>(url);
  }

  async update(id: number, todo: Todo): Promise<Todo | null> {
    const url = `${environment.apiUrl}Todo/${id}`;
    const todoDTO = toTodoDTO(todo);

    try {
      const res = await lastValueFrom(this.http.put<TodoDTO>(url, todoDTO));
      return fromTodoDTO(res);
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      return null;
    }
  }

  async delete(id: number): Promise<boolean> {
    const url = `${environment.apiUrl}Todo/${id}`;

    try {
      await lastValueFrom(this.http.delete<void>(url));
      return true;
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
      return false;
    }
  }
}
