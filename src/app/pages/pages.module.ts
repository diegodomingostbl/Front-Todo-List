import { NgModule } from '@angular/core';
import { TodoModule } from './todo/todo.module';

@NgModule({
  declarations: [],
  imports: [TodoModule],
  exports: [TodoModule],
})
export class PagesModule {}
