export interface IUser {
  handle: string;
  name: string;
  email: string;
  password: string;
}

export interface IRegisterForm
  extends Pick<IUser, "handle" | "name" | "email"> {
  password: string;
  passwordConfirmation: string;
}
