import { randomBytes } from 'crypto';
import { Response, Request } from 'miragejs';
import { User } from '../../interfaces/user.interface';
import { handleErrors } from '../server';

const generateToken = () => randomBytes(8).toString('hex');

export interface AuthResponse {
  token: string;
  user: User;
}

export const login = (schema: any, req: Request): AuthResponse | Response => {
  const { username, password } = JSON.parse(req.requestBody);
  const user = schema.users.findBy({ username });
  if (!user) {
    return handleErrors(null, 'No user with that username exists');
  }
  if (password !== user.password) {
    return handleErrors(null, 'Password is incorrect');
  }
  const token = generateToken();
  return {
    user: user.attrs as User,
    token,
  };
};

export const signup = (schema: any, req: Request): AuthResponse | Response => {
  const data = JSON.parse(req.requestBody);
  const exUser = schema.users.find({ username: data.username });
  if (exUser) {
    return handleErrors(null, 'User already exists!');
  }
  const user = schema.users.create(data);
  const token = generateToken();
  return {
    user: user.attr as User,
    token,
  };
};
