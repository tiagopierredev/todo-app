export class UserAlreadyExistsError extends Error {
    constructor() {
      super("Email user already exists");
    }
  }
  