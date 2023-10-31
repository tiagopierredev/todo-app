export class TodoNotExist extends Error {
  constructor() {
    super("Todo does not exist");
  }
}
