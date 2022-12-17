import React from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import FormatPrice from "../Helpers/FormatPrice";
import {Button} from "../styles/Button";
// try to responsive filter section


import Batton from "react-bootstrap/Button";
import Fade from "react-bootstrap/Fade";

const FilterSection = () => 
{
       const [open, setOpen] = useState(false);
  const {
    filters: { text, category, company, colors, price, maxPrice, minPrice },
    updateFilterValue,
    all_products,
    clearFilters,
  } = useFilterContext();

  // fun() t get unique products
   const getUniqueData=(data,property)=>
   {
    let newData=data.map((curData)=>{
      return curData[property];
    });

    if (property==="colors")
    {
         return (newData=["all",...new Set([].concat(...newData))]);
    }
      // using set to get unique vlue
    else{  return (newData = ["all", ...new Set(newData)]); }
     
   }

  // define function for all listed catagory and get with function
  const catagoryData = getUniqueData(all_products,"category");
  const companyData = getUniqueData(all_products,"company");
    const colorsData = getUniqueData(all_products, "colors");
  //  console.log(colorsData);
 // console.log(catagoryData);
  return (
    <Wrapper>
      {/* // serach bar */}
      <div className="filter-search">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="text"
            value={text}
            onChange={updateFilterValue}
            placeholder="Search"
          />
        </form>
      </div>

      {/* //filter categry-product category */}

      {/* //company based product category */}

      {/* || clear filter || */}

      <div>
        <Batton
          onClick={() => setOpen(!open)}
          aria-controls="example-fade-text"
          aria-expanded={open}
        >
         Filters
        </Batton>
        <Fade in={open}>
          <div id="example-fade-text">
            <div className="filter-category">
              <h3>Category</h3>
              <div>
                {catagoryData.map((curElem, index) => {
                  return (
                    <button
                      key={index}
                      type="button"
                      name="category"
                      value={curElem}
                      // update value according to category in product
                      onClick={updateFilterValue}
                    >
                      {curElem}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="filter-company">
              <h3>Company</h3>
              <form action="#">
                <select
                  name="company"
                  id="company"
                  className="filter-company--select"
                  onClick={updateFilterValue}
                >
                  {companyData.map((curele, index) => {
                    return (
                      <option key={index} value={curele} name="company">
                        {curele}
                      </option>
                    );
                  })}
                </select>
              </form>
            </div>
            {/* || filters colors section */}
            <div className="filter-colors colors">
              <h3>Colors</h3>
              <div className="filter-color-style ">
                {colorsData.map((curColor, index) => {
                  if (curColor === "all") {
                    return (
                      <button
                        key={index}
                        type="button"
                        className="color-all--style"
                        name="colors"
                        value={curColor}
                        onClick={updateFilterValue}
                      >
                        all
                      </button>
                    );
                  }
                  return (
                    <button
                      key={index}
                      type="button"
                      className={
                        colors === curColor ? "btnStyle active" : "btnStyle"
                      }
                      name="colors"
                      value={curColor}
                      style={{ backgroundColor: curColor }}
                      onClick={updateFilterValue}
                    >
                      {colors === curColor ? (
                        <FaCheck className="checkStyle" />
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ||filters with price rnge */}
            <div className="filter_price ">
              <h3>Price</h3>
              <p>
                <FormatPrice price={price} />
              </p>
              <input
                type="range"
                name="price"
                max={maxPrice}
                min={minPrice}
                value={price}
                onChange={updateFilterValue}
              />
            </div>
            <div className="filter-clear">
              <Button className="btn" onClick={clearFilters}>
                clear Flters
              </Button>
            </div>
          </div>
        </Fade>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  h3 {
    padding: 2rem 0;
    font-size: bold;
  }
  .filter-search {
    input {
      padding: 0.6rem 1rem;
      width: 80%;
    }
  }
  .filter-category {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.4rem;
      button {
        border: none;
        background-color: ${({ theme }) => theme.colors.white};
        text-transform: capitalize;
        cursor: pointer;
        &:hover {
          color: ${({ theme }) => theme.colors.btn};
        }
      }
      .active {
        border-bottom: 1px solid #000;
        color: ${({ theme }) => theme.colors.btn};
      }
    }
  }
  .filter-company--select {
    padding: 0.3rem 1.2rem;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    text-transform: capitalize;
  }
  .filter-color-style {
    display: flex;
    justify-content: center;
  }
  .color-all--style {
    background-color: transparent;
    text-transform: capitalize;
    border: none;
    cursor: pointer;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }
  .active {
    opacity: 2;
  }
  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }
  .filter_price {
    input {
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
    }
  }
  .filter-shipping {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .filter-clear .btn {
    background-color: #ec7063;
    color: #000;
  }
`;
export default FilterSection;
