const filterReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_FILTER_PRODUCTS":
       let priceArr = action.payload.map((curElem) => curElem.price);
       let maxPrice = Math.max(...priceArr);
      return {
        ...state,
        filter_products: [...action.payload],
        all_products: [...action.payload],
        filters: { ...state.filters, maxPrice, price: maxPrice },
      };

    case "SET_GRID_VIEW":
      return {
        ...state,
        grid_view: true,
      };
    case "SET_LIST_VIEW": {
      return {
        ...state,
        grid_view: false,
      };
    }
    case "GET_SORT_VALUE": {
      let userSelect = document.getElementById("sort");
      //sorting value store user which one chose in option
      let sort_value = userSelect.options[userSelect.selectedIndex].value;
      return {
        ...state,
        sorting_value: sort_value,
      };
    }

    case "SORTING_PRODUCTS": {
      let newSortProduct;
    //  let tempSortProduct=[...action.payload];
    const {filter_products}=state;
     let tempSortProduct = [...filter_products];
        
       if (state.sorting_value === "highest") {
     
         const sortingPriceProduct = (a, b) => {
           return b.price - a.price;
         };
         newSortProduct = tempSortProduct.sort(sortingPriceProduct);
       }

       if(state.sorting_value ==="lowest")
       {
         const sortingPriceProduct=(a,b)=>{
           return a.price-b.price;
         }
        newSortProduct = tempSortProduct.sort(sortingPriceProduct);
       }
      if(state.sorting_value === "a-z")
      {
      newSortProduct=tempSortProduct.sort((a,b)=>{
        return a.name.localeCompare(b.name);
      });
      }

       if (state.sorting_value === "z-a") {
         newSortProduct = tempSortProduct.sort((a, b) => {
           return b.name.localeCompare(a.name);
         });
       }
      return {
        ...state,
        filter_products: newSortProduct,
      };
    }

    case "UPDATE_FILTERS_VALUE":
      const {name,value}=action.payload;
      return{
        ...state,
        filters:{
         ...state.filters,
         [name]:value,
        }
      }
      // its update filtervalue use for *COMPANY ,COLORS ,CATEGORY
      case "UPDATE_FILTERS_PRODUCT":
        {
          let{all_products}=state;
          // copy value to orginal
          let tempFiltersProducts=[...all_products];
          //initiate value in text
               const { text ,category,company,colors,price} = state.filters;
               if(text)
               {
                tempFiltersProducts = tempFiltersProducts.filter((curPoduct)=>
               curPoduct.name.toLowerCase().includes(text)
                );
               }

               if(category !== "all")
               {
                tempFiltersProducts = tempFiltersProducts.filter((curPoduct)=> curPoduct.category === category
                );
               }

                if(company !=="all")
                {
                     tempFiltersProducts = tempFiltersProducts.filter(
                       (curPoduct) => curPoduct.company.toLowerCase() === company.toLowerCase()
                       
                     );
                }
                if(colors !=="all")
                {
                 // console.log(colors);
                  tempFiltersProducts = tempFiltersProducts.filter(
                    (curColor) => curColor.colors.find((elem)=> {
                      return elem===colors;
                    })
                  );
                }
                if(price===0)
                {
                  tempFiltersProducts=tempFiltersProducts.filter((curPrice)=> curPrice.price === price);
                }
                else
                {
                   tempFiltersProducts = tempFiltersProducts.filter(
                     (curPrice) => curPrice.price <= price
                   );
                }
          return {
            ...state,
            filter_products: tempFiltersProducts,
          };
        }
        case "CLEAR_FILTERS":
          return {
            ...state,
            filters: {
              ...state.filters,
              text: "",
              category: "all",
              company: "all",
              colors: "all",
              maxPrice: 0,
              price: state.filters.maxPrice,
              minPrice: state.filters.maxPrice,
            },
          };
    default:
      return state;
  }
};

export default filterReducer;
