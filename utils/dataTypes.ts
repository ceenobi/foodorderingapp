interface PizzaS {
  img: string
  size: string
  id: number
  width: string
  height: string
}

interface Category {
  img: string
  caption: string
  color: string
  desc: string
}

const pizzaSize: PizzaS[] = [
  {
    img: 'https://res.cloudinary.com/ceenobi/image/upload/e_bgremoval/v1662997671/samples/food/529-5290903_pizza-hut-pepperoni-pizza-slice-hd-png-download_ur4k8c.png',
    size: 'small',
    id: 0,
    width: '60px',
    height: '60px',
  },
  {
    img: 'https://res.cloudinary.com/ceenobi/image/upload/e_bgremoval/v1662997671/samples/food/529-5290903_pizza-hut-pepperoni-pizza-slice-hd-png-download_ur4k8c.png',
    size: 'medium',
    id: 1,
    width: '80px',
    height: '80px',
  },
  {
    img: 'https://res.cloudinary.com/ceenobi/image/upload/e_bgremoval/v1662997671/samples/food/529-5290903_pizza-hut-pepperoni-pizza-slice-hd-png-download_ur4k8c.png',
    size: 'large',
    id: 2,
    width: '100px',
    height: '100px',
  },
]

const images = [
  {
    original:
      'https://res.cloudinary.com/ceenobi/image/upload/f_auto/v1662722919/samples/food/download_cudw7h.jpg',
    caption: 'Pizza chilli',
  },
  {
    original:
      'https://res.cloudinary.com/ceenobi/image/upload/f_auto/v1662727721/samples/food/download_hdi04t.jpg',
    caption: 'Pizza pepperoni',
  },
  {
    original:
      'https://res.cloudinary.com/ceenobi/image/upload/f_auto/v1662727800/samples/food/download_towx56.jpg',
    caption: 'Leafy magic',
  },
]

const categories: Category[] = [
  {
    img: 'https://res.cloudinary.com/ceenobi/image/upload/f_auto/v1662715287/samples/food/download_rztzze.jpg',
    caption: 'Deals',
    color: 'linear(to-r, rgba(0, 0 ,0 ,0.7), rgba(0, 0 ,0 ,0.2))',
    desc: 'Take advantage of our super deals',
  },
  {
    img: 'https://res.cloudinary.com/ceenobi/image/upload/f_auto/v1662715287/samples/food/download_rztzze.jpg',
    caption: 'Deluxe Pack',
    color: 'linear(to-r, rgba(0, 0 ,0 ,0.7), rgba(0, 0 ,0 ,0.2))',
    desc: 'Buy our deluxe pizza, tasty, rich and ready to serve a group',
  },
  {
    img: 'https://res.cloudinary.com/ceenobi/image/upload/v1662761586/samples/food/download_lgh71n.webp',
    caption: 'Starter',
    color: 'linear(to-r, rgba(0, 0 ,0 ,0.7), rgba(0, 0 ,0 ,0.2))',
    desc: 'Eat solo, tasty, come have a taste, we guarantee satisfaction',
  },
  {
    img: 'https://res.cloudinary.com/ceenobi/image/upload/v1662761817/samples/food/download_l3nrdq.webp',
    caption: 'Premium Pack',
    color: 'linear(to-r, rgba(0, 0 ,0 ,0.7), rgba(0, 0 ,0 ,0.2))',
    desc: 'Super class, no matter the occassion, Premium has got you covered',
  },
]

export {pizzaSize, images, categories}
