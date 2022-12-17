import React from "react";
import { createContext, useContext, useReducer, useEffect } from "react";
import { useProductContext } from "./productcontex";
import reducer from "../reducer/filterReducer";

const FilterContext = createContext();

const initialState = {
  filter_products: [],
  all_products: [],
  grid_view: true,
  sorting_value: "lowest",
  filters: {
    text: "",
    category: "all",
    company: "all",
    colors: "all",
    maxPrice: 0,
    price: 0,
    minPrice: 0,
  },
};

export const FilterContextProvider = ({ children }) => {
  const { products } = useProductContext();

  const [state, dispatch] = useReducer(reducer, initialState);

  // update filter fun()
    const updateFilterValue=(event)=>{
        let name=event.target.name;
        let value=event.target.value;
        return dispatch({type:"UPDATE_FILTERS_VALUE",payload:{name,value}});
    };

  // to set the grid view
  const setGridView = () => {
    return dispatch({ type: "SET_GRID_VIEW" });
  };
    // to set the List  view
    const setListView = () => {
      return dispatch({ type: "SET_LIST_VIEW" });
    };

    // sorting based on user selection
    const sorting=()=>{
         dispatch({type:"GET_SORT_VALUE"});
    };
    // get sorting products
    useEffect(() => {
      dispatch({type:"UPDATE_FILTERS_PRODUCT"});
      dispatch({ type: "SORTING_PRODUCTS", });
    }, [state.sorting_value,state.filters]);

  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);
 
   // **TO clear all fiters
   const clearFilters = () => {
     dispatch({ type: "CLEAR_FILTERS" });
   };
  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        sorting,
        updateFilterValue,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
