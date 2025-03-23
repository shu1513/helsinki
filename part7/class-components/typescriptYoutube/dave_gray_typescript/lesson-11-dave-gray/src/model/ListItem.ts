export interface Item {
  id: string;
  item: string;
  checked: boolean;
}

export default class ListItem implements Item {
  public constructor(
    private _id: string = "",
    private _item: string = "",
    private _checked: boolean = false
  ) {}
  public get id(): string {
    return this._id;
  }
  public get item(): string {
    return this._item;
  }
  public get checked(): boolean {
    return this._checked;
  }
  public set id(i: string) {
    this._id = i;
  }
  public set item(i: string) {
    this._item = i;
  }
  public set checked(i: boolean) {
    this._checked = i;
  }
}
