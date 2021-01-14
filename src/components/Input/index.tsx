import React, { InputHTMLAttributes } from 'react';
import { Spinner } from 'react-bootstrap';
import MaskedInput from 'react-text-mask';
import { Colors } from 'shared/colors';
import { SearchIcon } from 'shared/icons';
import { IptWrapper, Ipt, Label, ErrorText } from './styles';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  withoutIcon?: boolean;
  isSearchLoading?: boolean;
  errorMsg?: string;
  hasError?: boolean;
  mask?: any;
}

const Input: React.FC<Props> = ({
  label,
  mask,
  withoutIcon,
  className: classes,
  isSearchLoading,
  errorMsg = '',
  ...iptProps
}) => {
  const Icon = isSearchLoading ? (
    <Spinner
      style={{ color: Colors.black, width: 20, height: 20 }}
      animation="border"
    />
  ) : (
    <SearchIcon color={Colors.black} size={20} />
  );

  return (
    <IptWrapper className={classes}>
      {label && <Label className="mb-0">{label}</Label>}
      <Ipt
        valid={errorMsg === ''}
        className="ipt w-100 d-flex align-items-center"
      >
        {mask ? (
          <MaskedInput
            mask={mask}
            className="w-100"
            type="text"
            {...iptProps}
          />
        ) : (
          <input className="w-100" type="text" {...iptProps} />
        )}

        {!withoutIcon && Icon}
      </Ipt>
      {errorMsg && (
        <ErrorText className="d-block text-center">{errorMsg}</ErrorText>
      )}
    </IptWrapper>
  );
};

export default Input;
