import { NgModule } from '@angular/core';
import { TodoComponent } from './todo.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { CdkDropListGroup, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { TodoService } from './api/services/todo.service';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [TodoComponent, TodoFormComponent, TodoListComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
  ],
  exports: [TodoComponent, TodoFormComponent, TodoListComponent],
  providers: [TodoService, provideHttpClient()],
})
export class TodoModule {}
