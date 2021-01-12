export interface UserInfo {
    nick: string
    phone: number | null
    token: string,
    id: string,
}

export interface LoginFrom {
    phone: number | null
    password: string
}
