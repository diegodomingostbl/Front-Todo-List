import {
  CdkDrag,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { Todo } from '../../api/interfaces/todo.interface';
import { TodoService } from '../../api/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  @Input() todoList?: Todo[];

  @Input() doneList?: Todo[];

  constructor(private todoService: TodoService) {}

  async drop(event: CdkDragDrop<Todo[] | undefined>) {
    if (!event) return;
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data ?? [],
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data ?? [],
        event.container.data ?? [],
        event.previousIndex,
        event.currentIndex
      );

      this.updateTodo(event.item.data as Todo);
    }
  }

  async updateTodo(todoEvent: Todo) {
    try {
      todoEvent.IsComplete = !todoEvent.IsComplete;

      const todo = await this.todoService.update(todoEvent.id, todoEvent);
      if (todo) {
        console.log('Tarefa atualizada');
      } else {
        alert('Falha ao criar a tarefa.');
      }
    } catch (err) {
      console.error('Erro ao criar tarefa:', err);
    }
  }

  async removeTodo(id: number) {
    try {
      const success = await this.todoService.delete(id);
      if (success) {
        this.todoList = this.todoList?.filter((todo) => todo.id !== id);
        this.doneList = this.doneList?.filter((done) => done.id !== id);
      } else {
        alert('Falha ao remover a tarefa.');
      }
    } catch (err) {
      console.error('Erro ao remover tarefa:', err);
    }
  }
}
