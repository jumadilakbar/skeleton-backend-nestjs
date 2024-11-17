import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import {
  failResponse,
  responseMessages,
  successResponse,
} from 'src/helpers/api-response';

@Injectable()
export class UserService {
  private userRepo: Repository<User>;
  constructor(private connection: Connection) {
    this.userRepo = this.connection.getRepository(User);
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepo.findOne({
      where: {
        username: createUserDto.username,
      },
    });

    if (user) {
      return failResponse({
        code: 400,
        message: 'User Already Exist',
      });
    }
    createUserDto.password = bcrypt.hashSync(createUserDto.password, 12);

    return await this.userRepo
      .save(createUserDto)
      .then((res) =>
        successResponse({
          code: 200,
          message: responseMessages.createSuccess,
          data: res,
        }),
      )
      .catch((err) => err);
  }

  async findAll() {
    return await this.userRepo
      .find()
      .then((res) =>
        successResponse({
          code: 200,
          message: responseMessages.success,
          data: res,
        }),
      )
      .catch((err) => err);
  }

  async findOne(id: number) {
    return await this.userRepo
      .findOne(id)
      .then((res) =>
        successResponse({
          code: 200,
          message: responseMessages.success,
          data: res,
        }),
      )
      .catch((err) => err);
  }

  findByUsername(username: string) {
    return this.userRepo.findOne({
      where: {
        username,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.checkUserExistById(id);

    updateUserDto.password = bcrypt.hashSync(updateUserDto.password, 12);
    return await this.userRepo
      .update(id, updateUserDto)
      .then(() =>
        successResponse({
          code: 200,
          message: responseMessages.updateSuccess,
          data: updateUserDto,
        }),
      )
      .catch((err) => err);
  }

  async remove(id: number) {
    await this.checkUserExistById(id);

    return await this.userRepo
      .delete(id)
      .then(() =>
        successResponse({
          code: 200,
          message: responseMessages.deleteSuccess,
          data: '',
        }),
      )
      .catch((err) => err);
  }

  async checkUserExistById(id: number) {
    const userExist = await this.userRepo.findOne(id);
    if (!userExist) {
      return failResponse({
        code: 404,
        message: 'User Not Found',
      });
    }
  }
}
