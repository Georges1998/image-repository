export class GetCurrentUser {
  static readonly type = '[User] current user';
  constructor(public payload: { email: string; password: string }) {}
}

export class GetUser {
  static readonly type = '[User] get user';
  constructor(public payload: { id: string }) {}
}

export class BuyImage {
  static readonly type = '[User] buy image';
  constructor(public payload: { id: string; imageId: string }) {}
}

export class SignUpUser {
  static readonly type = '[User] sign up user';
  constructor(
    public payload: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    }
  ) {}
}
