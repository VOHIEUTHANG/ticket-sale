import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router';
import { useMemo } from 'react';
import queryString from 'query-string';
import lodash from 'lodash';

export const indexOfArrayObject = (array: any[], key: string, value: any) => {
  if (!Array.isArray(array)) {
    return;
  }
  let index = -1;
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    if (item[key] === value) {
      index = i;
      break;
    }
  }
  return index;
};

export const debounce = (callback: any, delay: number) => {
  return lodash.debounce(callback, delay);
};

export const onScrollBottom = (callBack: any) => {
  window.onscroll = function (event) {
    if (window.innerHeight + window.scrollY > document.body.offsetHeight) {
      callBack(event);
    }
  };
};

export function roundToTwo(num: string) {
  return Number.parseFloat(num).toFixed(2);
}

export function useRouter() {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();

  // Return our custom router object
  // Memoize so that a new object is only returned if something changes
  return useMemo(() => {
    return {
      // For convenience add push(), replace(), pathname at top level
      push: history.push,
      replace: history.replace,
      pathname: location.pathname,
      // Merge params and parsed query string into single "query" object
      // so that they can be used interchangeably.
      // Example: /:topic?sort=popular -> { topic: "react", sort: "popular" }
      query: {
        ...queryString.parse(location.search), // Convert string to object
        ...params,
      },
      // Include match, location, history objects so we have
      // access to extra React Router functionality if needed.
      match,
      location,
      history,
    };
  }, [params, match, location, history]);
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const random = Math.random();
  return Math.floor(random * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
export function isValidHttpUrl(string: string) {
  let url;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }
  return url.protocol === 'http:' || url.protocol === 'https:';
}

export const spliceArray = (arr: Array<any>, start: number, end: number) => {
  return [...arr].splice(start, end);
};

export const getCookie = (cname: string) => {
  const name = cname + '=';
  const decodedCookie: string = decodeURIComponent(document.cookie) || '';
  if (decodedCookie == null || decodedCookie === '') {
    return '';
  }
  const cookieValue = decodedCookie
    .split('; ')
    ?.find(row => row.startsWith(name))
    ?.split('=')[1];
  return cookieValue || '';
};

export const toFirstUpperCase = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
export const toFirstLowerCase = (string: string) => {
  return string.charAt(0).toLowerCase() + string.slice(1);
};

export function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}
