import ListItem from "./ListItem";

interface List {
  list: ListItem[];
  load(): void;
  save(): void;
  clearList(): void;
  addItem(itemObj: ListItem): void;
  removeItem(id: string): void;
}

export default class FullList implements List {
  static instance: FullList = new FullList();
  private constructor(private _list: ListItem[] = []) {}
  get list(): ListItem[] {
    return this._list;
  }
  load(): void {
    const storedList: string | null = localStorage.getItem("mylist");
    if (typeof storedList !== "string") {
      return;
    }
    const parsedList: { _id: string; _item: string; _checked: boolean }[] =
      JSON.parse(storedList);

    // Directly populate the _list array with ListItem instances.
    this._list = parsedList.map(
      (itemObj) => new ListItem(itemObj._id, itemObj._item, itemObj._checked)
    );
  }
  save(): void {
    localStorage.setItem("mylist", JSON.stringify(this.list));
  }
  clearList() {
    this._list = [];
    this.save();
  }
  addItem(itemObj: ListItem): void {
    this._list = this._list.concat(itemObj);
    this.save();
  }
  removeItem(id: string): void {
    this._list = this._list.filter((listItem) => {
      return listItem.id !== id;
    });
    this.save();
  }
}
