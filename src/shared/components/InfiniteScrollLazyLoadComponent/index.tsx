import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
interface IProps {
  children: any;
  yCoor?: number;
  delay: number; // delay
  loading?: any;
}

const InfiniteScrollLazyLoad = ({ children, yCoor, loading }: IProps) => {
  const refScrollLazy = useRef<any>();
  const childrenNew: Array<any> = useMemo(
    () => (children.length !== undefined ? children : [children]),
    [children],
  );

  const childrenDom = (pChildren: any) => {
    return pChildren.map((x: any) => ({
      dom: x,
      active: false,
    }));
  };

  const [activeChildren, setActiveChildren] = useState({
    current: -1,
    children: [],
  });
  const checkScrollHeight = useCallback(() => {
    const offsetTop =
      yCoor || (refScrollLazy.current?.offsetTop || 0) + refScrollLazy.current.offsetHeight;

    if (window.scrollY + window.innerHeight >= offsetTop - 200) {
      setActiveChildren((pre: any) => {
        if (pre.current + 1 >= childrenNew.length) {
          window.removeEventListener('scroll', checkScrollHeight);
        }

        return {
          current: pre.current + 1,
          children: pre.children.map((x: any, index: number) => ({
            dom: x.dom,
            active: x.active || pre.current === index,
          })),
        };
      });
    }
  }, [refScrollLazy, childrenNew, yCoor]);

  useEffect(() => {
    setActiveChildren(pre => ({
      ...pre,
      current: -1,
      children: childrenDom(childrenNew),
    }));
    checkScrollHeight();
    window.removeEventListener('scroll', checkScrollHeight);
    window.addEventListener('scroll', checkScrollHeight);
    return () => {
      window.removeEventListener('scroll', checkScrollHeight);
    };
  }, [checkScrollHeight, childrenNew]);

  return (
    <div ref={refScrollLazy}>
      {activeChildren.children.map((x: any, index) => {
        return x.active ? (
          <Suspense fallback={loading || <div />} key={index}>
            {{ ...x.dom }}
          </Suspense>
        ) : null;
      })}
    </div>
  );
};
export default React.memo(InfiniteScrollLazyLoad);
