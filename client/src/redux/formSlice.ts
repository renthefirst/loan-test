import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCategories } from './thunks';

interface Category {
  name: string;
  slug: string;
  url: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  gender: string;
  workplace: string;
  address: string;
  loanAmount: number;
  loanTerm: number;
  categories: Category[];
}

const initialState: FormData = {
  firstName: '',
  lastName: '',
  phone: '',
  gender: '',
  workplace: '',
  address: '',
  loanAmount: 200,
  loanTerm: 10,
  categories: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormStep1Data: (
      state,
      action: PayloadAction<
        Pick<FormData, 'firstName' | 'lastName' | 'phone' | 'gender'>
      >
    ) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.phone = action.payload.phone;
      state.gender = action.payload.gender;
    },
    setFormStep2Data: (
      state,
      action: PayloadAction<Pick<FormData, 'workplace' | 'address'>>
    ) => {
      state.workplace = action.payload.workplace;
      state.address = action.payload.address;
    },
    setFormStep3Data: (
      state,
      action: PayloadAction<Pick<FormData, 'loanAmount' | 'loanTerm'>>
    ) => {
      state.loanAmount = action.payload.loanAmount;
      state.loanTerm = action.payload.loanTerm;
    },
    resetFormData: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const {
  setFormStep1Data,
  setFormStep2Data,
  setFormStep3Data,
  resetFormData,
} = formSlice.actions;

export default formSlice.reducer;
