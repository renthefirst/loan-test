import { createAsyncThunk } from '@reduxjs/toolkit';


const fetchCategories = createAsyncThunk('categories/all', async () => {
  const response = await fetch('https://dummyjson.com/products/categories');
  const data = await response.json();  
  return data;
});

export {fetchCategories}