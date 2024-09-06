import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


let updatedItems=[];


const initialState = {
         productItem: [],
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
          addToCart(state,action) {
                const Item = action.payload;

                const existingCartItemIndex = updatedItems.findIndex(
                (data) => data.item._id === Item.item._id   
                );
                const existingCartItem = state.productItem[existingCartItemIndex];
                
                if (existingCartItem) {
                const updatedItem = {
                    ...existingCartItem,
                    quantity: Number(existingCartItem.quantity) + Number(Item.quantity),
                };

                state.productItem[existingCartItemIndex] = updatedItem;
                updatedItems = [...updatedItems];
                state.productItem = [...state.productItem];
                
                } 
                else {
                    updatedItems = [...updatedItems,Item];
                    state.productItem = [...state.productItem,Item];
                }
                
                localStorage.setItem("Cart", JSON.stringify(updatedItems));
          },
          IncreaseItem(state, action) {
            const Item = action.payload;

            // state.productItem = updatedItems

            const existingCartItemIndex = updatedItems.findIndex(
              (data) => data.item._id === Item.item._id 
            );
            console.log(existingCartItemIndex);
            const existingItem = state.productItem[existingCartItemIndex];
            const updatedItem = { ...existingItem, 
              quantity: Number(existingItem.quantity) + 1 };
              updatedItems[existingCartItemIndex] = updatedItem;
              state.productItem[existingCartItemIndex] = updatedItem

              localStorage.setItem("Cart", JSON.stringify(updatedItems));
          },
          DecreaseItem(state, action) {
            const Item = action.payload;
            const existingCartItemIndex = updatedItems.findIndex(
              (data) => data.item._id === Item.item._id 
            );
            console.log(existingCartItemIndex);
            const existingItem = state.productItem[existingCartItemIndex];
            if(existingItem.quantity <= 1 ){
              toast.info("Product Quantity must grather than 1!");
              updatedItems = [...updatedItems];
              // state.productItem =[...state.productItem];
            }else {

              const updatedItem = { ...existingItem, 
                quantity: Number(existingItem.quantity) - 1 };
                updatedItems[existingCartItemIndex] = updatedItem;
                state.productItem[existingCartItemIndex] = updatedItem;
            }

              localStorage.setItem("Cart", JSON.stringify(updatedItems));
                
          },
          removeCartItem(state,action) {
            const Item = action.payload;
              // state.productItem = updatedItems;
              if(confirm('Delete Item ?')) {
                state.productItem = updatedItems.filter(data => data.item._id !== Item.item._id);
                updatedItems = updatedItems.filter(data => data.item._id !== Item.item._id);
                toast.success("removed item !");
              }
              
            localStorage.setItem("Cart", JSON.stringify(state.productItem));
              
          },
          SaveItem(state,action) {
            const Item = action.payload;
            const existingCartItemIndex = updatedItems.findIndex(
              (data) => data.item._id === Item.item._id   
              );    
            const existingCartItem = state.productItem[existingCartItemIndex];
            if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                quantity: Number(existingCartItem.quantity) + Number(Item.quantity),
            };

            state.productItem[existingCartItemIndex] = updatedItem;
            updatedItems = [...updatedItems];
            state.productItem = [...state.productItem];
            
            } 
            else {
                updatedItems = [...updatedItems,Item];
                state.productItem = [...state.productItem,Item];
            }
            
          }

    }
})


export default cartSlice;
export const cartAction = cartSlice.actions;