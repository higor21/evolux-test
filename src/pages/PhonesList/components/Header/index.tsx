import { Button, Input } from 'components';
import { useWindowDimensions } from 'hooks';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PhoneIcon } from 'shared/icons';
import _ from 'lodash';
import {
  DEFAULT_PAGE_NUMBER,
  setPage,
  setSearchQuery,
} from 'store/phoneList/slice';
import { RootState } from 'store';
import { strToNumbers } from 'shared/helpers';
import { InputChangeProps } from 'shared/types';
import { useHistory } from 'react-router-dom';
import { RouteNames } from 'shared/constants';
import styled from 'styled-components';
import { Colors } from 'shared/colors';

const DEFAULT_DEVICE_WIDTH = 500;
const SEARCH_TIME_LIMIT_MS = 300;
const PHONE_NUMBERS_LENGTH = 13;

const HeaderWrapper = styled.div`
  border-radius: 1em;
  background-color: ${Colors.blue};

  & > small {
    color: ${Colors.white};
    font-size: 1.2em;
    text-align: center;
    margin: 0.25rem 0;
  }
`;

const Header: React.FC<any> = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading, searchQuery } = useSelector(
    (state: RootState) => state.phoneList
  );

  const [search, setSearch] = useState(searchQuery);
  const [runSpinner, setRunSpinner] = useState(false);

  const { width } = useWindowDimensions();

  const handleSearch = useCallback(
    _.debounce((text: string) => {
      dispatch(setPage(DEFAULT_PAGE_NUMBER));
      dispatch(setSearchQuery(text));
    }, SEARCH_TIME_LIMIT_MS),
    []
  );

  const handleOnChageValue = ({ target: { value } }: InputChangeProps) => {
    let onlyNumbersValue = strToNumbers(value);
    setSearch(onlyNumbersValue);
    handleSearch(onlyNumbersValue);
    setRunSpinner(value.length === onlyNumbersValue.length);
  };

  useEffect(() => {
    if (!loading && runSpinner) setRunSpinner(false);
  }, [loading]);

  if (!width) return null;
  const isAMobileDevice = width <= DEFAULT_DEVICE_WIDTH;

  return (
    <HeaderWrapper className="d-flex pb-3 px-3 flex-column justify-content-between">
      <small style={{ color: Colors.white }}>
        Search for any part of the phone number.
      </small>
      <div className="d-flex align-items-center justify-content-between">
        <Input
          className="mr-2"
          placeholder="Search for a number"
          value={search}
          onChange={handleOnChageValue}
          maxLength={PHONE_NUMBERS_LENGTH}
          isSearchLoading={runSpinner}
        />
        <Button
          customIcon={PhoneIcon}
          customLabel="New Phone"
          insetShadow
          withoutLabel={isAMobileDevice}
          onClick={() => history.push(RouteNames.phoneAdd)}
        />
      </div>
    </HeaderWrapper>
  );
};

export default Header;
