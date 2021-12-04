import { useState } from "react";
import { useQuery } from "react-query";
// components
import { Drawer, LinearProgress, Grid, Badge } from "@material-ui/core";
import { AddShoppingCart, PersonalVideo } from "@material-ui/icons";
import Item from "./item/Item";
import { StyledButton } from "./App.styles";
import Cart from "./cart/Cart";
// styles
import { Wrapper } from "./App.styles";

// types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number
}

const getProducts = async (): Promise<CartItemType[]> => {
  const res = await fetch('https://fakestoreapi.com/products')
  return await res.json()
}

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[])


  const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts)


  const getTotalItems = (items: CartItemType[]) => {
    return items.reduce((ack: number, item) => {
      return ack += item.amount
    }, 0)
  };
  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id)
      if (isItemInCart) {
        return prev.map((item) => item.id === clickedItem.id ? { ...item, amount: item.amount + 1 } : item)
      }
      return [...prev, { ...clickedItem, amount: 1 }]

    })
  };
  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) => (
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) {
            return ack
          } else {
            return [...ack, { ...item, amount: item.amount - 1 }]
          }
        } else {
          return [...ack, item]
        }
      }, [] as CartItemType[])
    ))

  };



  if (isLoading) return <LinearProgress />;
  if (error) return <div>Somthing went wrong...</div>
  return (
    <Wrapper>
      <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCart />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>

        {data?.map((item) => {
          return <Grid item key={item.id} xs={12} sm={4} md={3}>
            <Item item={item} handleAddToCart={handleAddToCart} />

          </Grid>

        })}

      </Grid>
    </Wrapper>
  );
}

export default App;
