import { useEffect, useCallback } from 'react';

const useClickOutside = (listRef: Array<any>, onClickOutside) => {
  const clickOutside = useCallback(
    event => {
      const idOutSide = listRef.every(ref => !ref.current.contains(event.target));
      if (idOutSide) {
        onClickOutside(event);
      }
    },
    [listRef, onClickOutside],
  );
  useEffect(() => {
    document.addEventListener('mousedown', clickOutside);
    document.addEventListener('touchstart', clickOutside);

    return () => {
      document.removeEventListener('mousedown', clickOutside);
      document.removeEventListener('touchstart', clickOutside);
    };
  }, [clickOutside]);
};

export default useClickOutside;
