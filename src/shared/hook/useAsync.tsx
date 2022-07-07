import { useCallback, useState } from 'react';

interface IState<T> {
  status: 'ready' | 'loading' | 'error';
  value?: T;
  error: any;
}

export function useSingleAsync<T = any>(asyncFunction: (...params: any[]) => Promise<T>) {
  const [state, setState] = useState<IState<T>>({
    status: 'ready',
    value: undefined,
    error: null,
  });

  const onSuccess = useCallback((response: T) => {
    setState(prevState => ({
      ...prevState,
      status: 'ready',
      value: response,
    }));
    return Promise.resolve(response);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onError = useCallback((error: any) => {
    setState(prevState => ({
      ...prevState,
      status: 'error',
      error: error,
    }));
    return Promise.reject(error);
  }, []);

  const execute = useCallback(
    (...args: any[]) => {
      setState(prevState => ({
        ...prevState,
        status: 'loading',
        value: undefined,
        error: null,
      }));
      return asyncFunction(...args)
        .then(onSuccess)
        .catch(onError);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    // eslint-disable-next-line @typescript-eslint/comma-dangle
    [asyncFunction, onError, onSuccess],
  );
  return { execute, ...state };
}
