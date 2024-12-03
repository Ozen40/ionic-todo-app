import { Injectable } from '@angular/core';
import { Todo } from './model/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private storageKey = 'todos';

  constructor() { }

  getTodos(): any[] {
    const todos = localStorage.getItem(this.storageKey);
    return todos ? JSON.parse(todos) : [];
  }

  addTodo(todo: any) {
    const todos = this.getTodos();
    todos.push(todo);
    localStorage.setItem(this.storageKey, JSON.stringify(todos));
  }

  deleteTodo(id: string) {
    const todos = this.getTodos();
    const updatedTodos = todos.filter(todo => todo.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(updatedTodos));
  }

  updateTodo(updatedTodo: any) {
    const todos = this.getTodos();
    const index = todos.findIndex(todo => todo.id === updatedTodo.id);
    if (index !== -1) {
      todos[index] = updatedTodo;
      localStorage.setItem(this.storageKey, JSON.stringify(todos));
    }
  }

  getTodoByName(name: string) {
    const todos = this.getTodos();
    return todos.find(todo => todo.name === name);
  }
}
