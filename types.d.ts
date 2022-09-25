export interface Product {
  id: Key | null | undefined
  _id: string
  title: string
  desc: string
  img: string[]
  category: string
  quantity: number
  prices: number[]
  extraOptions: {
    text: string
    price: number
    _id: string
  }[]
  slug: string
}

export interface Order {
  _id: string
  customer: string | any
  address: string
  total: number
  status: number
  method: number
}

export interface User {
  email: string
  username: string
  isAdmin: boolean
  password: string
}