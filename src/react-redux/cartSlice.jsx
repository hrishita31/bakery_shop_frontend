import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const url = import.meta.env.VITE_API_URL;

const username = JSON.parse(Cookies.get("details")).usrname;

export const checkoutCart = createAsyncThunk(
  "products/checkout",
  async (cartItems, { rejectWithValue }) => {
    const updatedCart = [{username: username}, ...cartItems]
    console.log(updatedCart, "cart items");
    try {
      const response = await axios.post(`${url}/products/checkout`, {
        cart: updatedCart,
      });
      console.log(response, 7809);
      console.log(response.data.result, 9090);
      toast.success("Checkout successful");
      return updatedCart;
    } catch (error) {
      //toast.error("Checkout failed");
      console.log(error.message);
      return toast.error(rejectWithValue(error?.response?.data || "an error occurred"));
    }
  }
);

export const fetchCartData = createAsyncThunk(
  "products/showCart",
  async (username, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${url}/products/showCart?username=${username}`
      );
      console.log(response, "response");
      console.log(response.data.result, "response.data.result");
      toast.success("View Cart");
      return response.data.result;
    } catch (error) {
      return toast.error(rejectWithValue(error.response.data));
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    status: null,
  },
  reducers: {
    addToCart: (state, action) => {
      if (!Array.isArray(state.cart)) {
        state.cart = [];
      }

      console.log("Current Cart:", state.cart);
      console.log("Payload:", action.payload);

      const itemInCart = state.cart.find(
        (item) => item.productId === action.payload.productId
      );

      if (itemInCart) {
        console.log("Product already in cart");
      } else {
        state.cart.push({
          ...action.payload,
          quantity: 1,
          dessertName : action.payload.dessertName,
          image : action.payload.image,
          price: action.payload.price,
          // productDetails: action.payload.productDetails || [],
        });
        console.log("Updated Cart:", state.cart);
      }
    },

    incrementQuantity: (state, action) => {
      const item = state.cart.find(
        (item) => item.productId === action.payload.productId
      );
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find(
        (item) => item.productId === action.payload.productId
      );
      if (item.quantity === 1) {
        const removeItem = state.cart.filter(
          (item) => item.productId !== action.payload.productId
        );
        state.cart = removeItem;
      } else {
        item.quantity--;
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item.productId !== action.payload.productId
      );
      state.cart = removeItem;
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkoutCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkoutCart.fulfilled, (state, action) => {
        console.log("cart after checkout: ", action.payload);
        //state.cart = [];
       // state.cart = action.payload;
       // state.status = "succeeded";
      })
      .addCase(checkoutCart.rejected, (state, action) => {
        state.status = "failed";
        console.log("checkout failed", action.payload);
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
        state.cart = Array.isArray(action.payload) ? action.payload : [];
      });
  },
});

export const cartReducer = cartSlice.reducer;
export const { addToCart, incrementQuantity, decrementQuantity, removeItem } =
  cartSlice.actions;
