export interface Contact {
    name: string,
    email: string,
    phone: string,
    _id: string,
    coins: number
}
export interface ContactFilter {
    term: string
}