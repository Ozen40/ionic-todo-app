import { Component } from '@angular/core';
import { Todo } from '../model/todo';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  todoList: Todo[] = [];
  newTodo: string = "";

  constructor() { }

  addTodo() {
    if (this.newTodo.trim()) {
      this.todoList.push({ name: this.newTodo.trim(), completed: false });
      this.newTodo = "";
    }
  }

  deleteTodo(todo: Todo) {
    this.todoList = this.todoList.filter(item => item !== todo);
  }
}
