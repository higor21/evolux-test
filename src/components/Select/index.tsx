import React, { CSSProperties } from 'react';
import Select, {
  OptionProps,
  OptionTypeBase,
  SingleValueProps,
  MenuProps,
  Props as SelectProps,
} from 'react-select';
import { Colors } from 'shared/colors';
import { ErrorText, IptWrapper, Label } from './styles';

interface CustomSelectProps {
  label?: string;
  errorMsg?: string;
}

type Props = CustomSelectProps & SelectProps;

// eslint-disable-next-line react/prop-types
const SelectInput: React.FC<Props> = ({
  disabled = false,
  width,
  label,
  errorMsg = '',
  ...selectProps
}) => {
  const customStyles: any = {
    menu: (provided: CSSProperties, { selectProps }: MenuProps<any, any>) => ({
      ...provided,
      width: selectProps?.width || '100%',
      borderRadius: 10,
      padding: 10,
    }),
    IndicatorsContainer: (provided: CSSProperties): CSSProperties => ({
      ...provided,
      padding: 0,
      height: 20,
    }),
    container: (provided: CSSProperties): CSSProperties => ({
      ...provided,
      marginLeft: '0 !important',
      marginRight: '0 !important',
    }),
    option: (
      provided: CSSProperties,
      { data, isSelected }: OptionProps<OptionTypeBase, any>
    ) => ({
      ...provided,
      color: Colors.gray,
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: '1.5em',
      border: 'none',
      boxSizing: 'border-box',
      borderRadius: 5,
      marginBottom: 2,
      transitionDuration: '0.1s',
      backgroundColor: isSelected ? `${Colors.blue}35` : Colors.white,
      '&:hover': {
        borderLeft: `2px solid ${Colors.blue}`,
        color: Colors.green,
        backgroundColor: `${Colors.blue}35`,
        transitionDuration: '0.1s',
      },
    }),
    control: (provided: CSSProperties) => ({
      ...provided,
      height: 33,
      minHeight: 'unset',
      border: `none`,
      width: '100%',
      padding: '0.5em 1em',
      borderRadius: '1em',
      boxShadow: `inset 0 0 10px -2px ${errorMsg ? Colors.red : Colors.shadow}`,
      '&:hover': { borderColor: Colors.gray },
    }),
    singleValue: (
      provided: CSSProperties,
      { data }: SingleValueProps<any>
    ) => ({
      ...provided,
      color: data.color || Colors.black,
      textAlign: 'center',
      fontWeight: 500,
      fontSize: '1.4em',
    }),
    placeholder: (provided: CSSProperties) => ({
      ...provided,
      color: disabled ? Colors.gray : Colors.gray,
      textAlign: 'center',
      fontWeight: 500,
      fontSize: '1.4em',
    }),
    indicatorSeparator: (provided: CSSProperties) => ({
      ...provided,
      display: 'none',
    }),
    dropdownIndicator: (provided: CSSProperties) => ({
      ...provided,
      color: Colors.black,
      padding: 'none',
    }),
    clearIndicator: (provided: CSSProperties) => ({
      ...provided,
      padding: 0,
      transform: 'translate(4px, 0px)',
    }),
    valueContainer: (provided: CSSProperties) => ({
      ...provided,
      padding: 0,
    }),
  };

  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <IptWrapper>
      {label && <Label className="mb-0">{label}</Label>}{' '}
      <Select
        className="mx-2"
        isDisabled={disabled}
        styles={customStyles}
        {...selectProps}
        hideSelectedOptions
        isClearable
      />
      {errorMsg && (
        <ErrorText className="d-block text-center">{errorMsg}</ErrorText>
      )}
    </IptWrapper>
  );
};

export default SelectInput;
