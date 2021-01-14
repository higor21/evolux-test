import { Paginator } from 'components';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from 'shared/colors';
import { RootState } from 'store';
import { DEFAULT_PAGE_NUMBER, setPage } from 'store/phoneList/slice';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: ${Colors.blue};
  border-radius: 15px;
  position: sticky;
  bottom: 1.5rem;
`;

interface Props {}

const Footer: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const { page, count, nextPage, loading } = useSelector(
    (state: RootState) => state.phoneList
  );

  const [loadMode, setLoadMode] = useState<'stable' | 'left' | 'right'>(
    'stable'
  );

  const hpreviousPage = () => {
    setLoadMode('left');
    return page > DEFAULT_PAGE_NUMBER && dispatch(setPage(page - 1));
  };
  const hnextPage = () => {
    setLoadMode('right');
    return nextPage && dispatch(setPage(page + 1));
  };

  useEffect(() => {
    if (!loading && loadMode !== 'stable') setLoadMode('stable');
  }, [loading]);

  return (
    <Wrapper className="p-2">
      <Paginator
        handleNextPage={hnextPage}
        handlePreviousPage={hpreviousPage}
        page={page}
        count={count || 0}
        onLoadMode={loadMode}
      />
    </Wrapper>
  );
};

export default Footer;
