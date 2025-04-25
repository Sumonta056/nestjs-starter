import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

export interface IUser {
  id: number;
  name: string;
  email: string;
  age: number | null;
  country: string | null;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class UserService {
  users: IUser[];
  constructor(private readonly prisma: PrismaService) {}

  createUser(userData: Prisma.UserCreateInput): Promise<IUser> {
    return this.prisma.user.create({
      data: userData,
    }) as Promise<IUser>;
  }

  getAllUsers() {
    return this.prisma.user.findMany();
  }

  findUsersByName(name: string): Promise<IUser[]> {
    if (!name) {
      return this.getAllUsers();
    }
    return this.prisma.user.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    }) as Promise<IUser[]>;
  }

  findUserById(id: string): IUser | undefined {
    return this.users.find((user) => user.id === parseInt(id));
  }
}
