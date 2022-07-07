import { useLocation } from 'react-router';

export function useQueryParams() {
  return new URLSearchParams(useLocation().search);
}

export function toString(data: any) {
  if (typeof data !== 'object') {
    return data;
  }
  try {
    return JSON.stringify(data);
  } catch (e) {}
}

export function toSearch(queryParams: any) {
  return Object.keys(queryParams)
    .filter(key => queryParams[key] !== undefined)
    .map(key => `${key}=${encodeURIComponent(toString(queryParams[key]))}`)
    .join('&');
}
