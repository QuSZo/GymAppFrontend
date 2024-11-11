export class AuthRequiredError extends Error {
  constructor(message = "Auth Required") {
    super(message);
    this.name = "AuthRequiredError";
  }
}
