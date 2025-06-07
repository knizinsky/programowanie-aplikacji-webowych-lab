import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../services/user.service';
import { firstValueFrom } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  imports: [MatCardModule, MatListModule],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  currentUser!: User;

  constructor(private userService: UserService) {}

  async ngOnInit(): Promise<void> {
    this.users = this.userService.getUsers();
    this.currentUser = await firstValueFrom(this.userService.getUser());
  }
}
