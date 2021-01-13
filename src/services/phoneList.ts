import api from 'config/api';
import { PhoneProps } from 'shared/types';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from 'store/phoneList/slice';

export const getPhones = (
  page = DEFAULT_PAGE_NUMBER,
  pageSize = DEFAULT_PAGE_SIZE,
  search = ''
) => {
  const filterQuery = search ? `&search=${search}` : '';
  return api.get(`phones?page=${page}&pageSize=${pageSize}${filterQuery}`);
};

export const updatePhone = (id: number, body: PhoneProps) =>
  api.put(`phones/${id}`, body);

export const deletePhone = (id: number) => api.delete(`phones/${id}`);

export const addPhone = (body: PhoneProps) => api.post('phones', body);
