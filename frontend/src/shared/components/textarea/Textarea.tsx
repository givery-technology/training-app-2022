import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import classnames from 'classnames';

import './Textarea.scss';

export type TextareaProps = {} & DetailedHTMLProps<
  InputHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

export function Textarea(props: TextareaProps) {
  const { ...rest } = props;

  const rootStyle = classnames('app-c-textarea form-control', {});

  return <textarea className={rootStyle} {...rest} />;
}
