export class GetAllImagesForUser {
  static readonly type = '[Image] Get by user ID';
  constructor(public payload: { id: string }) {}
}


