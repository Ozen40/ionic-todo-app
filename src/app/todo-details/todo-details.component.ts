import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss'],
  imports: [IonicModule, FormsModule, CommonModule],
  standalone: true
})
export class TodoDetailsComponent implements OnInit {
  todo: any;

  constructor(private route: ActivatedRoute, private todoService: TodoService) { }

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');
    if (name != null) {
      this.todo = this.todoService.getTodoByName(name);
    }
  }

}
