import { PhoneDetailCard } from 'components';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RouteNames } from 'shared/constants';
import { PhoneProps, PhoneResProps } from 'shared/types';
import { RootState } from 'store';
import { deletePhone } from 'store/phoneList/middlewares';
import { setEditablePhone } from 'store/phoneList/slice';
import styled from 'styled-components';

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

  const handleEditOnClick = (p: PhoneResProps) => {
    dispatch(setEditablePhone(p));
    history.push(`${RouteNames.phoneEdit}/${p.id}`);
  };

  const handleRemoveOnClick = ({ id }: PhoneResProps) => {
    dispatch(deletePhone(id));
    setRemovedPhoneId(id);
  };

  return (
    <ListWrapper className="d-flex my-4 p-4 flex-column">
      {phones.map((p: PhoneResProps) => {
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
    </ListWrapper>
  );
};

export default List;
