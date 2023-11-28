export interface User {
    _id:string,
    name: string,
    coins: number,
    moves: Transactions[]
}
export interface UserFilter {
    term: string
}
export interface Transactions {
    toId?: string,
    to: string,
    coins: number,
    at:Date
  }