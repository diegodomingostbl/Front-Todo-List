import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css',
})
export class TodoFormComponent {
  @Output() save = new EventEmitter<string>();

  todoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      description: ['', [Validators.required]],
    });
  }

  addTodo() {
    if (this.todoForm.valid) {
      const todo = this.todoForm.get('description')?.value.trim();
      this.save.emit(todo);
      this.todoForm.reset();
    } else {
      alert('A descrição é obrigatória!');
    }
  }
}
