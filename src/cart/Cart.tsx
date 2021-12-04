// styles
import { Wrapper } from "./Cart.styles"
// component
import CartItem from "../cart_item/CartItem"
// types
import { CartItemType } from "../App"
type Props = {
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void
}

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
    const calculateTotal = (items: CartItemType[]) => (
        items.reduce((ack: number, item) => ack + item.amount * item.price, 0)

    )
    return (
        <Wrapper>
            <h2>Your shopping cart</h2>
            {cartItems.length === 0 ? <p>No items in cart</p> : null}
            {cartItems.map((item) => {
                return <CartItem
                    key={item.id}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            })}
            <p>Total:${calculateTotal(cartItems).toFixed(2)}</p>

        </Wrapper>
    )
}

export default Cart
