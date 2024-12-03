import { Component } from '@angular/core';
import { Todo } from '../model/todo';
import { Router } from '@angular/router';
import { TodoService } from '../todo.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  todos: Todo[] = [];
  newTodoName: string = "";

  constructor(private router: Router, private todoService: TodoService, private navCtrl: NavController) { }

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todos = this.todoService.getTodos();
  }

  addTodo() {
    const newTodo = {
      name: this.newTodoName,
      isCompleted: false,
      createdAt: new Date(),
    };
    this.todoService.addTodo(newTodo);
    this.loadTodos();
  }

  deleteTodo(name: string) {
    this.todoService.deleteTodo(name);
    this.loadTodos();
  }

  goToDetails(name: string) {
    this.router.navigate(["/todo-details", name]);
  }
}
