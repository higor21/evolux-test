import { Button, Input, Layout, Select } from 'components';
import { FormikProps, withFormik } from 'formik';
import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  currencySymbolsArr,
  phoneNumberMask,
  RouteNames,
} from 'shared/constants';
import { OptPhoneProps, PhoneProps } from 'shared/types';
import { RootState } from 'store';
import { addPhone } from 'store/phoneList/middlewares';
import * as Yup from 'yup';
import { Card, Inputs, Title } from './styles';

interface FormValues extends PhoneProps {}

const PhoneEdit: React.FC<FormikProps<FormValues>> = ({
  handleChange,
  values,
  errors,
  touched,
  isValid,
  dirty,
  handleBlur,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading } = useSelector((state: RootState) => state.phoneList);
  const [runLoading, setRunLoading] = useState(false);
  const [currencyErrMsg, setCurrencyErrMsg] = useState<string>('');
  const [currencyValue, setCurrencyValue] = useState<any>(null);

  const currencyOptions = currencySymbolsArr.map((c) => ({
    value: c,
    label: c,
  }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (isValid && dirty) {
      dispatch(addPhone(values));
      setRunLoading(true);
    }
  };

  const handleError = (
    field: 'phoneNumber' | 'currency' | 'setupPrice' | 'monthyPrice'
  ) => {
    const hasError = touched[field] && errors[field];
    return hasError ? errors[field] : '';
  };

  useEffect(() => {
    if (!loading && runLoading) {
      setRunLoading(false);
      history.push(RouteNames.phoneList);
    }
  }, [loading]);

  return (
    <Layout>
      <Card className="p-3 d-flex flex-column">
        <Title className="align-self-center">Adding a new Phone Number</Title>
        <form>
          <Inputs className="my-4">
            <Input
              type="text"
              mask={phoneNumberMask}
              value={values.phoneNumber}
              name="phoneNumber"
              onChange={handleChange('phoneNumber')}
              onBlur={handleBlur('phoneNumber')}
              label="Phone Number"
              placeholder="Enter a valid phone number"
              errorMsg={handleError('phoneNumber')}
              withoutIcon
            />
            <Select
              disabled={false}
              options={currencyOptions}
              onChange={(selected) => {
                setCurrencyErrMsg('');
                setCurrencyValue(selected);
              }}
              value={currencyValue}
              errorMsg={currencyErrMsg}
              label="Currency Symbol"
              placeholder="Permissão"
              onBlur={() =>
                setCurrencyErrMsg(
                  !currencyValue ? 'This field is required' : ''
                )
              }
            />
            <Input
              min={0}
              type="number"
              value={values.setupPrice}
              name="setupPrice"
              onChange={handleChange('setupPrice')}
              onBlur={handleBlur('setupPrice')}
              label="Setup Price"
              placeholder="Enter a setup price"
              errorMsg={handleError('setupPrice')}
              withoutIcon
            />
            <Input
              min={0}
              type="number"
              value={values.monthyPrice}
              name="monthyPrice"
              onChange={handleChange('monthyPrice')}
              onBlur={handleBlur('monthyPrice')}
              label="Monthy Price"
              placeholder="Enter a monthy price"
              errorMsg={handleError('monthyPrice')}
              withoutIcon
            />
          </Inputs>
          <div className="d-flex align-items-center justify-content-between">
            <Button
              type="button"
              mode="cancel"
              onClick={() => history.goBack()}
            />
            <Button
              type="button"
              mode="submit"
              disabled={!isValid || !currencyValue}
              isLoading={runLoading}
              onClick={handleSubmit}
            />
          </div>
        </form>
      </Card>
    </Layout>
  );
};

export default withFormik<any, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => ({
    phoneNumber: '',
    currency: '',
    setupPrice: '',
    monthyPrice: '',
  }),

  handleSubmit: (values) => {},

  validate: (values, props) => {
    const errors: OptPhoneProps = {};

    if (values.phoneNumber.replace(/\D/g, '').length !== 13) {
      errors.phoneNumber = 'Enter exactly 13 digits';
    }

    if (Number.parseFloat(values.monthyPrice.toString()) < 0) {
      errors.monthyPrice = 'This field must not contain a negative value';
    }

    if (Number.parseFloat(values.setupPrice.toString()) < 0) {
      errors.setupPrice = 'This field must not contain a negative value';
    }

    return errors;
  },

  validationSchema: Yup.object().shape({
    phoneNumber: Yup.string()
      .min(18, 'Enter exactly 13 digits')
      .max(18, 'Enter exactly 13 digits')
      .required('This field is required'),
    setupPrice: Yup.string().required('This field is required'),
    monthyPrice: Yup.string().required('This field is required'),
  }),
})(PhoneEdit);
