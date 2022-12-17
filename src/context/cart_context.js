import React, { useEffect } from "react";
import { useContext, useReducer } from "react";
import { createContext } from "react";
import reducer from "../reducer/CartReducer";

const cartContext=createContext();

const getLocalData=()=>{

    // store cart item in local storage
     let localCartData=localStorage.getItem("dataCart");
    // if(localCartData === [])
    // {
    //     return [];
    // }
    // else{
    //     // back string to normal
    //     return JSON.parse(localCartData);
    // }
    let ParseData=JSON.parse(localCartData);
    if(!Array.isArray(localCartData)) 
    {
      return [];
    }
    else{
      return ParseData;
    }
};
const initialState={
    cart:getLocalData(),
    total_item:"",
    total_price:"",
    shiping_fee:4000,
};
const CartProvider=({children})=>{
    const [state, dispatch] = useReducer(reducer, initialState);
const addToCart=(id,color,amount,product)=>{

    dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });

};

// remove item from cart
const removeItem=(id)=>{
 dispatch({type:"REMOVE_ITEM" ,payload:id});
}
// add data into local storage
useEffect(()=>{
    // convert any type data int *string and store data
    dispatch({type:"TOTAL_ITEM"});
    dispatch({type:"TOTAL_CART_PRICE"});
    localStorage.setItem("dataCart", JSON.stringify(state.cart));
},
[state.cart]);

// clear cart 

const clearCart=()=>{
    dispatch({type:"CLEAR_CART"});
}

// increase and decrease amount in cart section

 const setIncrease=(id)=>{
   
    dispatch({type:"SET_INCREASE",payload:id});
 }
 const setDecrease=(id)=>{
   dispatch({type:"SET_DECREASE", payload:id});
 }

    return (
      <cartContext.Provider
        value={{
          ...state,
          addToCart,
          removeItem,
          clearCart,
          setIncrease,
          setDecrease,
        }}
      >
        {children}
      </cartContext.Provider>
    );
};
const useCartContext=()=>{
    return useContext(cartContext);
}

export { CartProvider,useCartContext };