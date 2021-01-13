import { useWindowDimensions } from 'hooks';
import React from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from 'shared/colors';
import { ArrowLeftIcon, ArrowRightIcon } from 'shared/icons';
import { RootState } from 'store';
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  setPage,
} from 'store/phoneList/slice';
import { ChangePageBtn, PagMainInfo, Wrapper } from './styles';

const BRACK_WIDTH = 440;

interface Props {
  page: number;
  count: number;
  handlePreviousPage: () => any;
  handleNextPage: () => any;
  onLoadMode?: 'stable' | 'left' | 'right';
}

const Paginator: React.FC<Props> = ({
  page,
  count,
  handleNextPage,
  handlePreviousPage,
  onLoadMode = 'stable',
}) => {
  const { width } = useWindowDimensions();

  if (!width) return null;
  const isMobileDevice = width < BRACK_WIDTH;

  const LoadingIcon = (
    <Spinner
      style={{ color: Colors.black, width: 20, height: 20 }}
      animation="border"
    />
  );

  const PreviousBtn = (
    <ChangePageBtn type="button" onClick={handlePreviousPage}>
      {onLoadMode === 'left' ? (
        LoadingIcon
      ) : (
        <ArrowLeftIcon color={Colors.black} size={20} />
      )}
      <span className="ml-2">previous page</span>
    </ChangePageBtn>
  );

  const NextBtn = (
    <ChangePageBtn type="button" onClick={handleNextPage}>
      <span className="mr-2">next page</span>
      {onLoadMode === 'right' ? (
        LoadingIcon
      ) : (
        <ArrowRightIcon color={Colors.black} size={20} />
      )}
    </ChangePageBtn>
  );

  const PgInfo = (
    <PagMainInfo>
      <span className="number">{page}</span>
      <span> page of </span>
      <span className="number">
        {Math.trunc((count || 0) / DEFAULT_PAGE_SIZE)}
      </span>
    </PagMainInfo>
  );

  const wrapperStyle = isMobileDevice
    ? 'flex-column'
    : 'justify-content-between';

  return (
    <Wrapper className={`w-100 d-flex align-items-center ${wrapperStyle}`}>
      {!isMobileDevice ? (
        <>
          {PreviousBtn}
          {PgInfo}
          {NextBtn}
        </>
      ) : (
        <>
          {PgInfo}
          <div className="w-100 mt-3 d-flex justify-content-between">
            {PreviousBtn}
            {NextBtn}
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default Paginator;
