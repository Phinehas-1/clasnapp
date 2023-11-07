export type UserData = [string, string, string, string[], string[]];

export interface TableData {
  headings: String[];
  items: UserData[];
}
 
export interface IFlag {
  flag: boolean;
  setFlag: Function;
}

export interface IMark {
  mark: boolean;
  setMark: Function;
}
