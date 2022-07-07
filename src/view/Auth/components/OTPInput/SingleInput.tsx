import React, { memo, useRef, useLayoutEffect } from 'react';
import usePrevious from '@shared/hook/usePrevious';

export interface SingleOTPInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  focus?: boolean;
}

export function SingleOTPInputComponent(props: SingleOTPInputProps) {
  const { focus, autoFocus, ...rest } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const prevFocus = usePrevious(!!focus);
  useLayoutEffect(() => {
    if (inputRef.current == null || !focus || !autoFocus) {
      return;
    }
    const input: any = inputRef.current;
    input.focus();
    if (focus !== prevFocus) {
      input.focus();
      input.select();
    }
  }, [autoFocus, focus, prevFocus]);

  return <input ref={inputRef} {...rest} />;
}

const SingleOTPInput = memo(SingleOTPInputComponent);
export default SingleOTPInput;
