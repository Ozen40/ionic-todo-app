import { Component } from '@angular/core';
import { Todo } from '../model/todo';
import { Router } from '@angular/router';
import { TodoService } from '../services/todo.service';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  todos: Todo[] = [];
  newTodoName: string = "";
  isAuthenticated: boolean = false;

  constructor(private router: Router, private todoService: TodoService, private authService: AuthService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.loadTodos();
    this.todoService.todos$.subscribe(todos => {
      this.todos = todos;
    });
    this.isConnected();
  }

  loadTodos() {
    this.todos = this.todoService.getTodos();
  }

  addTodo() {
    const newTodo: Todo = {
      id: Date.now().toString(),
      name: this.newTodoName,
      isCompleted: false,
      creationDate: new Date(),
    };
    this.todoService.addTodo(newTodo);
    this.loadTodos();
    this.newTodoName = ""
    this.planifierNotification(newTodo.name);
  }

  deleteTodo(id: string) {
    this.todoService.deleteTodo(id);
    this.loadTodos();
  }

  goToDetails(id: string) {
    this.router.navigate(["/todo-details", id]);
  }

  login() {
    this.authService.login();
    this.isConnected();
  }

  logout() {
    this.authService.logout();
    this.isConnected();
  }

  isConnected() {
    this.isAuthenticated = this.authService.isConnected();
  }

  planifierNotification(todoName: string) {
    this.notificationService.scheduleNotification(
      'Ajout de Todo',
      `Le Todo : "${todoName}" a bien été ajouté`,
      1
    );
  }
}
