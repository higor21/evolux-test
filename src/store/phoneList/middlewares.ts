import { AppDispatch } from 'store/store';
import { actions as phoneListActions } from './slice';
import {
  addPhone,
  getPhones,
  updatePhone,
  deletePhone,
} from 'services/phoneList';
import { PhoneProps } from 'shared/types';
import { toast } from 'react-toastify';

const { setLoading, setError, setPhones } = phoneListActions;

const getPhonesThunk = (
  page?: number,
  pageSize?: number,
  search?: string
) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const { data, ...restAttrs } = await getPhones(page, pageSize, search);
    dispatch(setPhones({ phones: data, ...restAttrs }));
    dispatch(setLoading(false));
  } catch ({ response: res}) {
    toast.error(res?.data?.message || 'Error getting phones list')
    dispatch(setLoading(false));
  }
};

const updatePhoneThunk = (id: number, phone: PhoneProps) => async (
  dispatch: AppDispatch
) => {
  try {
    dispatch(setLoading(true));
    await updatePhone(id, phone);
    dispatch(setLoading(false));
    toast.success(`${phone.phoneNumber} was successfully updated`)
  } catch ({ response: res}) {
    toast.error(res?.data?.message || 'Error updating phone number')
    dispatch(setLoading(false));
  }
};

const deletePhoneThunk = (id: number) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    await deletePhone(id);
    toast.success(`The phone number was removed with success`)
  } catch ({ response: res}) {
    toast.error(res?.data?.message || 'Error deleting phone number')
    dispatch(setLoading(false));
  }
};

const addPhoneThunk = (phone: PhoneProps) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    await addPhone(phone);
    dispatch(setLoading(false));
    toast.success(`${phone.phoneNumber} was successfully added`)
  } catch ({ response: res}) {
    toast.error(res?.data?.message || 'Error adding a new phone number')
    dispatch(setLoading(false));
  }
};

export {
  getPhonesThunk as getPhones,
  updatePhoneThunk as updatePhone,
  addPhoneThunk as addPhone,
  deletePhoneThunk as deletePhone,
};
