import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  users: User[] = [];
  currentUser!: User;

  @Output() onLogout = new EventEmitter<void>();

  constructor(private userService: UserService) {}

  async ngOnInit(): Promise<void> {
    this.users = this.userService.getUsers();
    this.currentUser = await firstValueFrom(this.userService.getUser());
  }

  logout(): void {
    this.onLogout.emit();
  }
}
