export class User {
  first_name: string;
  last_name: string;
  middle_name: string;
  email: string;
  login: string;
  password: string;


  constructor(first_name: string, last_name: string,
              middle_name: string, email: string, login: string, password: string) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.middle_name = middle_name;
    this.email = email;
    this.login = login;
    this.password = password;
  }
}
