import React, { useEffect, useRef, useState } from 'react';
import { Layout } from 'components';
import { Footer, Header, List } from './components';
import { RouteComponentProps } from 'react-router-dom';
import { RouteNames } from 'shared/constants';
import { getPhones } from 'store/phoneList/middlewares';
import { useDispatch, useSelector } from 'react-redux';
import { clear, DEFAULT_PAGE_SIZE, setIntervalID } from 'store/phoneList/slice';
import { RootState } from 'store';

interface Props extends RouteComponentProps {}

const PhoneList: React.FC<Props> = ({ history }) => {
  const dispatch = useDispatch();
  const { page, searchQuery } = useSelector(
    (state: RootState) => state.phoneList
  );
  const intervalIdRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      window.clearInterval(intervalIdRef.current);
    };
  }, []);

  useEffect(() => {
    window.clearInterval(intervalIdRef.current);
    intervalIdRef.current = window.setInterval(() => {
      dispatch(getPhones(page, DEFAULT_PAGE_SIZE, searchQuery));
    }, 2000);
  }, [page, searchQuery]);

  return (
    <Layout>
      <Header />
      <List />
      <Footer />
    </Layout>
  );
};

export default PhoneList;
