import { Error, PhoneDetailCard } from 'components';
import React, { useLayoutEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Colors } from 'shared/colors';
import { RouteNames } from 'shared/constants';
import { PhoneProps, PhoneResProps } from 'shared/types';
import { RootState } from 'store';
import { deletePhone } from 'store/phoneList/middlewares';
import { setEditablePhone } from 'store/phoneList/slice';
import styled from 'styled-components';

import NotFoundIcon from 'assets/images/not_found.png';

const ListWrapper = styled.div`
  max-height: 350px;
  overflow-y: scroll;
`;

const List: React.FC<{}> = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [removedPhoneId, setRemovedPhoneId] = useState<number | null>(null);
  const { phones, loading } = useSelector(
    (state: RootState) => state.phoneList
  );
  const [compShown, setCompShown] = useState<
    'loading' | 'list' | 'not_found_icon'
  >('loading');

  const handleEditOnClick = (p: PhoneResProps) => {
    dispatch(setEditablePhone(p));
    history.push(`${RouteNames.phoneEdit}/${p.id}`);
  };

  const handleRemoveOnClick = ({ id }: PhoneResProps) => {
    dispatch(deletePhone(id));
    setRemovedPhoneId(id);
  };

  useLayoutEffect(() => {
    if (!phones) setCompShown('loading');
    else if (!phones.length) setCompShown('not_found_icon');
    else setCompShown('list');
  }, [phones]);

  return (
    <ListWrapper className="d-flex my-4 p-4 flex-column">
      {compShown === 'list' &&
        phones?.map((p: PhoneResProps) => {
          const { id, ...restPhoneProps } = p;
          return (
            <PhoneDetailCard
              key={id}
              style={{ margin: '0.5em 0' }}
              handleEdit={() => handleEditOnClick(p)}
              handleRemove={() => handleRemoveOnClick(p)}
              onRemoveLoading={loading && id === removedPhoneId}
              {...restPhoneProps}
            />
          );
        })}
      {compShown === 'loading' && (
        <div className="mx-auto py-5">
          <Spinner
            style={{ color: Colors.black, width: 50, height: 50 }}
            animation="border"
          />
        </div>
      )}
      {compShown === 'not_found_icon' && (
        <Error message="Phone number not found" />
      )}
    </ListWrapper>
  );
};

export default List;
