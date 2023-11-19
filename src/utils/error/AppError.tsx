import { toast } from "react-toastify";

class AppError extends Error {
  constructor(message: string) {
    super(message);
    toast.error(message);
  }
}

export { AppError };
