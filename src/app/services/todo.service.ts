import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../model/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private storageKey = 'todos';
  private todosSubject: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>(this.loadTodosFromStorage());

  todos$ = this.todosSubject.asObservable();

  constructor() { }

  private loadTodosFromStorage(): Todo[] {
    const todos = localStorage.getItem(this.storageKey);
    return todos ? JSON.parse(todos) : [];
  }

  private saveTodosToStorage(todos: Todo[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(todos));
    this.todosSubject.next(todos);
  }

  getTodos(): Todo[] {
    return this.todosSubject.getValue();
  }

  addTodo(todo: Todo): void {
    const todos = [...this.getTodos(), todo];
    this.saveTodosToStorage(todos);
  }

  deleteTodo(id: string): void {
    const todos = this.getTodos().filter(todo => todo.id !== id);
    this.saveTodosToStorage(todos);
  }

  updateTodo(updatedTodo: Todo): void {
    const todos = this.getTodos().map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo));
    this.saveTodosToStorage(todos);
  }

  getTodoById(id: string): Todo | undefined {
    return this.getTodos().find(todo => todo.id === id);
  }
}
