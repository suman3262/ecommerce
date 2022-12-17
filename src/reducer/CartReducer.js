

const CartReducer = (state,action) => {

    if(action.type === "ADD_TO_CART")
    {
        let {id,color,amount,product}=action.payload;
        // console.log(product);
      
        //check in cart exsisting product or not
        let exsistingProduct=state.cart.find((curItem)=> curItem.id ===id+color);
        // console.log(exsistingProduct);

      let addtocart;
     
      if(exsistingProduct)
      {
          let updateItem=state.cart.map((curItem)=>{
            if(curItem.id === id+color)
            {
              let newAmount=curItem.amount +amount;
              if(newAmount >= curItem.max)
              {
                newAmount=curItem.max;
              }
              return{
                ...curItem,
                amount:newAmount,
              };
            }
            else{
              return curItem;
            }
          })
          return{
            ...state,
            cart:updateItem,
          };
      }
      else{
      addtocart = {
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.image[0].url,
          price: product.price,
          max: product.stock,
        };
     
        
        return {
          ...state,
          //add new value after the previous value
          cart: [...state.cart, addtocart],
        };
      }
    }
    if(action.type === "REMOVE_ITEM")
    {
       let updateCart=state.cart.filter((curItem)=> curItem.id !==action.payload);
      return{
        ...state,
        cart:updateCart,
      }
    }
    // to clear the cart
    if(action.type ==="CLEAR_CART")
    {
      return{
        ...state,
        cart:[],
      }
    }
   
     // increment and decrement cart value
    if (action.type === "SET_INCREASE")
    {
       let updateAmount=state.cart.map((curItem)=>{

        if(curItem.id === action.payload)
        {
           let increment=curItem.amount +1;

           if(increment >= curItem.max)
           {
            increment=curItem.max;
           }
           return{
              ...curItem,
              amount:increment,
           };
           
        }
        else{

          return curItem;
        }
        
       })
       return{...state,cart:updateAmount};
    } 

    // decrement cart value
    if (action.type === "SET_DECREASE")
    {
      let updateAmount=state.cart.map((curItem)=>{
        if(curItem.id === action.payload)
        {
          let decrease=curItem.amount -1;
          if(decrease <=1)
          {
            decrease=1;
          }
          return{
            ...curItem,
            amount:decrease,
          }
        }
        else{
          return curItem;
        }
      })
      return{...state, cart:updateAmount};
    }
    // add total item that can show in cart ICON**
    if (action.type === "TOTAL_ITEM")
    {
      let updatedValue = state.cart.reduce((initialVal , curEle)=>{
          let {amount}=curEle;
          initialVal = initialVal + amount;
          return initialVal;
      },0);
      return {
        ...state,
        total_item: updatedValue,
      };
    } 

    // total amount using array reduce method

    if (action.type === "TOTAL_CART_PRICE")
    {
      let updateTotalCartPrice= state.cart.reduce((initialVal,curEle)=>{
        let {price,amount}=curEle;
        initialVal = initialVal+(price*amount);
        return initialVal;
      },0);
      return {
        ...state,
        total_price: updateTotalCartPrice,
      };
    } 
    return state;
}

export default CartReducer;