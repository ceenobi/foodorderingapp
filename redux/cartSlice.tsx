import { createSlice } from '@reduxjs/toolkit'

type Quantity = {
  quantity: number
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      if (Number.isNaN(action.payload)) return
      const itemInCart: any = state.cart.find(
        (item: any) => item.slug === action.payload.slug
      )
      if (itemInCart) {
        itemInCart.quantity++
      } else {
        state.cart.push({ ...action.payload, quantity: 1 })
      }
    },
    incrementQuantity: (state, action) => {
      if (Number.isNaN(action.payload)) return
      const item: any = state.cart.find(
        (item: { id: any }) => item.id === action.payload.id
      )
      item.quantity++
    },
    decrementQuantity: (state, action) => {
      if (Number.isNaN(action.payload)) return
      const item: any = state.cart.find(
        (item: { id: any }) => item.id === action.payload.id
      )
      if (item.quantity === 1) {
        item.quantity = 1
      } else {
        item.quantity--
      }
    },
    removeItem: (state, action) => {
      if (Number.isNaN(action.payload)) return
      state.cart = state.cart.filter(
        (item: { slug: any }) => item.slug !== action.payload
      )
    },
    reset: (state)=> {
      state.cart = []
    }
  },
})

export const cartReducer = cartSlice.reducer
export const { addToCart, incrementQuantity, decrementQuantity, removeItem , reset} =
  cartSlice.actions
