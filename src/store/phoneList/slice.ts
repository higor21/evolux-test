import { createSlice } from '@reduxjs/toolkit';
import { PhoneProps, PhoneResProps } from 'shared/types';

export const DEFAULT_PAGE_NUMBER = 1;
export const DEFAULT_PAGE_SIZE = 7;

interface IState {
  phones: PhoneResProps[];
  phone: PhoneResProps | null;
  searchQuery: string;
  page: number;
  count: number | null;
  nextPage: number | null;
  error: string | null;
  intervalID: any;
  loading: boolean;
}

const initialState: IState = {
  intervalID: null,
  phones: [],
  page: DEFAULT_PAGE_NUMBER,
  phone: null,
  searchQuery: '',
  count: null,
  nextPage: null,
  error: null,
  loading: false,
};

const phoneListSlice = createSlice({
  initialState,
  name: 'phone_list',
  reducers: {
    setPhones: (state, { payload }): IState => ({
      ...state,
      ...payload,
    }),
    setError: (state, { payload }): IState => ({
      ...state,
      error: payload,
    }),
    setLoading: (state, { payload }): IState => ({
      ...state,
      loading: payload,
    }),
    setEditablePhone: (state, { payload }): IState => ({
      ...state,
      phone: payload,
    }),
    setPage: (state, { payload }): IState => ({
      ...state,
      page: payload,
    }),
    setSearchQuery: (state, { payload }): IState => ({
      ...state,
      searchQuery: payload,
    }),
    setIntervalID: (state, { payload }): IState => ({
      ...state,
      intervalID: payload,
    }),
    clear: (): IState => initialState,
  },
});

export const { actions, reducer } = phoneListSlice;
export const {
  setLoading,
  setError,
  setPhones,
  setPage,
  clear,
  setEditablePhone,
  setSearchQuery,
  setIntervalID,
} = actions;
export default reducer;
