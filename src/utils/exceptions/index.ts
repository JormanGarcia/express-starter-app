export abstract class RuntimeException {
  public status: number = 500;
  public message: string = '';

  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }

  get(): any {
    return {
      status: this.status,
      message: this.message,
    };
  }
}

export class ResourceNotFoundException extends RuntimeException {
  constructor(message = 'Resource not found') {
    super(404, message);
  }
}

export class SomethingWentWrong extends RuntimeException {
  constructor() {
    super(500, 'Something went wrong');
  }
}

export class UnauthorizedException extends RuntimeException {
  constructor() {
    super(401, 'Unauthorized');
  }
}

export class ForbiddenRequest extends RuntimeException {
  constructor(private contraints: string[]) {
    super(403, 'Forbidden');
  }

  get() {
    return {
      status: this.status,
      message: this.message,
      contraints: this.contraints,
    };
  }
}
