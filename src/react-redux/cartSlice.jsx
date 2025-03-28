import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const url = import.meta.env.VITE_API_URL;
const token = Cookies.get("token");
const headers = { Authorization: `Bearer ${token}` };

export const checkoutCart = createAsyncThunk(
  "products/checkout",
  async (cartItems, { rejectWithValue }) => {
    const username = JSON.parse(Cookies.get("details")).usrname;
    const updatedCart = [{ username: username }, ...cartItems];

    try {
      const response = await axios.post(`${url}/products/checkout`, {
        cart: updatedCart,
      }, {
        headers,
      });
      console.log(response, 7809);
      console.log(response.data.result, 9090);
      toast.success("Checkout successful");
      return updatedCart;
    } catch (error) {
      return toast.error(
        rejectWithValue(error?.response?.data || "an error occurred")
      );
    }
  }
)

const deleteCartOnPayment = async (username) => {
  try {
    await axios.delete(
      `${url}/products/deleteItemsOnPayment?username=${username}`,
      {
        headers,
      }
    );
    console.log("deleted from backend")
  } catch (error) {
    toast.error("Some error occured" + error.message);
    throw error;
  }
};

export const saveOrderHistory = async (cartItems) => {
  try {
    
    const username = JSON.parse(Cookies.get("details")).usrname;
    const updatedCart = [{ username: username }, ...cartItems];
      const response = await axios.post(
          `${url}/users/saveOrderHistory`,
          { cart: updatedCart}, // Send order items in a single request
          { headers }
      );
      console.log(response);
      toast.success("Order placed successfully!");
      deleteCartOnPayment(username);
      
  } catch (error) {
      toast.error("Failed to place order ", error.message);
  }
};


export const fetchCartData = createAsyncThunk(
  "products/showCart",
  async (username, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${url}/products/showCart?username=${username}`,
        {
          headers,
        }
      );
      return response.data.result;
    } catch (error) {
      return toast.error(rejectWithValue(error.response.data));
    }
  }
);

export const saveCartOnLogout = createAsyncThunk(
  "products/saveOnLogout",
  async (cartItems, { rejectWithValue }) => {
    const username = JSON.parse(Cookies.get("details")).usrname;
    const updatedCart = [{ username: username }, ...cartItems];

    try {
      const response = await axios.post(`${url}/products/saveOnLogout`, {
        cart: updatedCart,
      }, {
        headers,
      });
      console.log(response, 7809);
      console.log(response.data.result, 9090);
      // toast.success("Checkout successful");
      return updatedCart;
    } catch (error) {
      console.log(error.message);
      return toast.error(
        rejectWithValue(error?.response?.data || "an error occurred")
      );
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

      const itemInCart = state.cart.find(
        (item) => item.productId === action.payload.productId
      );

      if (itemInCart) {
        toast.info("Product is already present in your cart!");
      } else {
        state.cart.push({
          ...action.payload,
          quantity: 1,
          // dessertName : action.payload.dessertName,
          // image : action.payload.image,
          // price: action.payload.price,
          productDetails: [
            {
              dessertName: action.payload.dessertName,
              image: {
                filename : action.payload.image,
              }
            },
          ],
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
      const unitPrice = item.price;
      item.totalPrice+=unitPrice;
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
        const unitPrice = item.price;
      item.totalPrice-=unitPrice;
      }
    },
    removeItem: (state, action) => {
      const removeItem = state.cart.filter(
        (item) => item.productId !== action.payload.productId
      );
      state.cart = removeItem;
    },

    addToCartFromFavs: (state, action) => {
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
          dessertName: action.payload.dessertName,
          image: action.payload.image,
          price: action.payload.price,
          quantity: 1,
          totalPrice : action.payload.price,
          // productDetails: action.payload.productDetails || [],
        });
        console.log("Updated Cart:", state.cart);
      }
    },

    clearCart: (state) => {
      state.cart = [];
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
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  clearCart,
} = cartSlice.actions;
