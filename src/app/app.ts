import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [ FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mytodoapp-angular');

  todos: any[] = [];
  newTodo: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.http.get<any[]>('http://localhost:8080/api/todos/getalltodos')
      .subscribe((data: any[]) => this.todos = data);
  }

  addTodo(): void {
    if (this.newTodo.trim()) {
      this.http.post('http://localhost:8080/api/todos/addtodo', { task: this.newTodo })
        .subscribe(() => {
          this.newTodo = '';
          this.loadTodos();
        });
    }
  }

  deleteTodo(id: number): void {
    this.http.delete(`http://localhost:8080/api/todos/deletetodo/${id}`)
      .subscribe(() => this.loadTodos());
  }
}
