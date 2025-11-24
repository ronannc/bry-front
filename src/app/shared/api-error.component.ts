import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-api-error',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule],
  template: `
    <mat-card *ngIf="errorMessage" color="warn" style="margin: 16px 0;">
      <mat-card-content>
        <mat-icon color="warn">error</mat-icon>
        <span style="margin-left: 8px; color: #b71c1c;">{{ errorMessage }}</span>
      </mat-card-content>
    </mat-card>
  `
})
export class ApiErrorComponent {
  @Input() errorMessage: string | null = null;
}
