import { Component } from '@angular/core';
import { Todo } from '../model/todo';
import { Router } from '@angular/router';
import { TodoService } from '../todo.service';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  todos: Todo[] = [];
  newTodoName: string = "";

  constructor(private router: Router, private todoService: TodoService, private navCtrl: NavController, private authService: AuthService) { }

  ngOnInit() {
    this.loadTodos();
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
  }

  logout() {
    this.authService.logout();
  }
}
