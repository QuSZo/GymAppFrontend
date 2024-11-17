import { ErrorsMap } from "@/common/lib/ErrorsMap";

export class ApiError extends Error {
  code: string;
  constructor(code: string) {
    const errorMessage = ErrorsMap.get(code) ?? "Coś poszło nie tak. Spróbuj ponownie.";
    super(errorMessage);
    this.name = "CustomError";
    this.code = code;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
