export class GetAllImagesForUser {
  static readonly type = '[Image] Get by user ID';
  constructor(public payload: { id: string }) {}
}

export class GetAllPurchasedImagesForUser {
  static readonly type = '[Image] Get all purchased';
  constructor(public payload: { id: string }) {}
}
