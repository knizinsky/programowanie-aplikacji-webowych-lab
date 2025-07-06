import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  imports: [
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    TitleCasePipe,
    NgClass,
    MatButtonModule,
  ],
})
export class UserListComponent implements OnInit {
  private readonly userService = inject(UserService);
  users: User[] = [];
  currentUser!: User | null;

  @Output() logout = new EventEmitter<void>();

  async ngOnInit(): Promise<void> {
    this.users = await this.userService.getUsers();
    this.currentUser = await firstValueFrom(this.userService.getUser());
  }

  onLogout(): void {
    this.logout.emit();
  }
}
