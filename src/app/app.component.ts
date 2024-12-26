import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [FormsModule, CommonModule],
})
export class AppComponent implements OnInit {
  data: any[] = [];
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.apiService.getData().subscribe((response) => {
      this.data = response;
    });
  }

  onSubmit(formData: { title: string; body: string }): void {
    const updatedPost = {
      id: 1,
      title: formData.title,
      body: formData.body,
      userId: 1,
    };

    this.apiService.updateData(1, updatedPost).subscribe((response) => {
      console.log('PUT Response:', response);

      const index = this.data.findIndex((item) => item.id === response.id);
      if (index !== -1) {
        this.data[index] = response;
      }

      formData.title = '';
      formData.body = '';
    });
  }
}
