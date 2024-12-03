import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, IonModal } from '@ionic/angular';
import { TodoService } from '../todo.service';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss'],
  imports: [IonicModule, FormsModule, CommonModule],
  standalone: true
})
export class TodoDetailsComponent implements OnInit {
  @ViewChild(IonModal)
  modal!: IonModal;

  todo: any;
  updatedTodo = "";
  isModalOpen = false;

  constructor(private route: ActivatedRoute, private todoService: TodoService) { }

  ngOnInit() {
    const todoId = this.route.snapshot.paramMap.get('id');
    if (todoId != null) {
      this.todo = this.todoService.getTodoById(todoId);
      if (this.todo) {
        this.updatedTodo = this.todo.name;
      }
    }
  }

  openEditModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveChanges() {
    if (this.updatedTodo.trim()) {
      this.todo.name = this.updatedTodo.trim();
      this.todoService.updateTodo(this.todo);
      this.closeModal();
    } else {
      alert('Le titre ne peut pas être vide.');
    }
  }

}
