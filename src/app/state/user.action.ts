export class GetCurrentUser {
  static readonly type = '[User] current user';
  constructor(public payload: { email: string; password: string }) {}
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
