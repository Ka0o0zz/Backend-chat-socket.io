interface IPhone {
  callsign: string;
  number: string;
}

export type IUser = {
  name: string;
  lastName: string;
  email: string;
  phone: IPhone;
  password: string;
};

export class User implements IUser {
  name: string;
  lastName: string;
  email: string;
  phone: IPhone;
  password: string;

  constructor({
    email,
    lastName,
    name,
    phone: { callsign, number },
    password,
  }: IUser) {
    this.email = email;
    this.lastName = lastName;
    this.name = name;
    this.phone = {
      callsign,
      number,
    };
    this.password = password;
  }
}
