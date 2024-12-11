class User {
  name: string;
  email: string;
  id?: string;
  constructor(name: string, email: string, id?: string) {
    this.name = name;
    this.email = email;
    this.id = id;
  }
  static validate(user: User) {
    const isEmailValid = user.email.includes("@");
    if (user.name.length < 5) throw new Error("Invalid user");

    if (!isEmailValid) throw new Error("Invalid email");
  }
  create() {
    const newUser = new User(this.name, this.email);
    User.validate(newUser);
    return newUser;
  }
}
export default User;
