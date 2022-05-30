import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import classnames from 'classnames';

import './Input.scss';

export type InputProps = {} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export function Input(props: InputProps) {
  const { ...rest } = props;

  const rootStyle = classnames('app-c-input form-control', {});

  return <input className={rootStyle} {...rest} />;
}
