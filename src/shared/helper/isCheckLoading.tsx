export const isCheckLoading = (arrayAPI: any[]) => {
  return arrayAPI.some(item => item.status === 'loading');
};
