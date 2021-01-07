export class GetAllImagesForUser {
  static readonly type = '[IMAGE] Get by user ID';
  constructor(public payload: { id: string }) {}
}

export class GetAllPurchasedImagesForUser {
  static readonly type = '[IMAGE] Get all purchased';
  constructor(public payload: { id: string }) {}
}
export class GetRandomImagesForUser {
  static readonly type = '[IMAGE] Get random images';
  constructor(public payload: { id: string }) {}
}
export class DeleteImage {
  static readonly type = '[IMAGE] delete images';
  constructor(public payload: { id: string }) {}
}
