import { Component, OnInit } from '@angular/core';
import { TodoService } from './api/services/todo.service';
import { fromTodoDTO } from './api/mappers/todo.mappers';
import { Todo } from './api/interfaces/todo.interface';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent implements OnInit {
  todo: Todo[] = [];
  done: Todo[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.findAndMapTodo();
  }

  findAndMapTodo() {
    this.todoService.getAll().subscribe({
      next: (res) => {
        this.todo = res.filter((x) => !x.done).map((x) => fromTodoDTO(x));
        this.done = res.filter((x) => x.done).map((x) => fromTodoDTO(x));
      },
      error: () => {},
      complete: () => {},
    });
  }

  async saveTodo(description: string) {
    try {
      const todo = await this.todoService.create(description);
      if (todo) {
        console.log('Tarefa criada:', todo);
        this.findAndMapTodo();
      } else {
        alert('Falha ao criar a tarefa.');
      }
    } catch (err) {
      console.error('Erro ao criar tarefa:', err);
    }
  }
}
