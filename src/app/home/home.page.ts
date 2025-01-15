import { Component } from '@angular/core';
import { Todo } from '../model/todo';
import { Router } from '@angular/router';
import { TodoService } from '../services/todo.service';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { LocationService } from '../services/location.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  todos: Todo[] = [];
  newTodoName: string = "";
  isAuthenticated: boolean = false;
  selectedDate: string = new Date().toISOString();
  currentCity: string = "";

  constructor(private router: Router, private todoService: TodoService, private authService: AuthService, private notificationService: NotificationService, private locationService: LocationService) { }

  async ngOnInit() {
    this.loadTodos();
    this.todoService.todos$.subscribe(todos => {
      this.todos = todos;
    });
    this.isConnected();
    try {
      this.currentCity = await this.locationService.getCurrentCity();
      console.log('Ville actuelle :', this.currentCity);
    } catch (error) {
      console.error('Erreur lors de l’obtention de la ville', error);
    }
  }

  loadTodos() {
    this.todos = this.todoService.getTodos();
  }

  addTodo() {
    const newTodo: Todo = {
      id: Date.now().toString(),
      name: this.newTodoName,
      isCompleted: false,
      creationDate: new Date(this.selectedDate),
      localisation: this.currentCity
    };
    this.todoService.addTodo(newTodo);
    this.loadTodos();
    this.newTodoName = ""
    this.selectedDate = new Date().toISOString();
    this.notificationAjout(newTodo.name);
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

  notificationAjout(todoName: string) {
    this.notificationService.scheduleNotification(
      'Ajout de Todo',
      `Le Todo : "${todoName}" a bien été ajouté`,
      1
    );
  }
}
