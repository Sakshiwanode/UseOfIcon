import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: any;
  quantity: number;  // Add a quantity field
}

interface CartState {
  items: Product[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      // Check if the product is already in the cart
      let found = false;
      for (const item of state.items) {
        if (item.id === product.id) {
          // Product is already in the cart; update quantity and total
          item.quantity += 1;
          state.total += product.price;
          found = true;
          break;
        }
      }
      if (!found) {
        // Product is not in the cart; add it and update total
        state.items.push({ ...product, quantity: 1 });
        state.total += product.price;
      }
    },
    
    removeCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      // Find the product to remove
      let productFound = null;
      for (const item of state.items) {
        if (item.id === productId) {
          productFound = item;
          break;
        }
      }
      if (productFound) {
        // Remove the product from the cart
        const updatedItems = [];
        for (const item of state.items) {
          if (item.id !== productId) {
            updatedItems.push(item);
          }
        }
        state.items = updatedItems;
        // Update the total
        state.total -= productFound.price * productFound.quantity;
      }
    },
    
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      // Find the product to increment
      for (const item of state.items) {
        if (item.id === productId) {
          item.quantity += 1;
          state.total += item.price;
          break;
        }
      }
    },
    
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      // Find the product to decrement
      for (const item of state.items) {
        if (item.id === productId) {
          if (item.quantity > 1) {
            // Reduce the quantity and total
            item.quantity -= 1;
            state.total -= item.price;
          } else {
            // Remove the product if quantity is 1
            state.items = state.items.filter(item => item.id !== productId);
            state.total -= item.price;
          }
          break;
        }
      }
    },
  },
});

export const { addToCart, removeCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
