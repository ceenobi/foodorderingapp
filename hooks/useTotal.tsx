import { useSelector } from 'react-redux'

export default function useTotal() {
  const cart = useSelector((state: any) => state.cart.cart)
  const getTotal = () => {
    let totalQuantity = 0
    let totalPrice = 0
    cart.forEach((item: { quantity: number; price: number }) => {
      totalQuantity += item.quantity
      totalPrice += item.price * item.quantity
    })
    return { totalPrice, totalQuantity }
  }

  return [getTotal]
}
