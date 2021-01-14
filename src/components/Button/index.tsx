import React, { ButtonHTMLAttributes } from 'react';
import { Spinner } from 'react-bootstrap';
import { Colors } from 'shared/colors';
import { CheckIcon, XIcon } from 'shared/icons';
import { BtnWrapper } from './styles';

const DEFAULT_ICON_SIZE = 25;

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  mode?: 'submit' | 'cancel';
  customLabel?: string;
  customIcon?: any;
  customColor?: any;
  iconSize?: number;
  withoutLabel?: boolean;
  isLoading?: boolean;
  insetShadow?: boolean;
}

const Button: React.FC<Props> = ({
  mode = 'submit',
  customColor,
  customIcon,
  iconSize = DEFAULT_ICON_SIZE,
  customLabel,
  withoutLabel,
  insetShadow,
  isLoading,
  ...btnProps
}) => {
  const label = customLabel || (mode === 'submit' ? 'Add' : 'Cancel');
  let color = customColor || (mode === 'submit' ? Colors.green : Colors.red);
  let Icon = customIcon || (mode === 'submit' ? CheckIcon : XIcon);

  color = btnProps?.disabled ? Colors.gray : color;

  Icon = isLoading ? (
    <Spinner
      style={{ color, width: iconSize, height: iconSize }}
      animation="border"
    />
  ) : (
    <Icon color={color} size={iconSize} />
  );

  return (
    <BtnWrapper
      btnColor={color}
      className="d-flex align-items-center py-1 px-3"
      inShadow={insetShadow}
      {...btnProps}
    >
      {!withoutLabel && <span className="mr-2">{label}</span>}
      {Icon}
    </BtnWrapper>
  );
};

export default Button;
