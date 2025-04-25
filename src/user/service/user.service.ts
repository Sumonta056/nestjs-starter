import { Injectable } from '@nestjs/common';

export interface IUser {
  id: string;
  name: string;
}

@Injectable()
export class UserService {
  private users: IUser[] = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
  ];

  findUsersByName(name: string): IUser[] {
    if (!name) {
      return this.users;
    }
    return this.users.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  findUserById(id: string): IUser | undefined {
    return this.users.find((user) => user.id === id);
  }
}
