import { useIntl } from 'react-intl';

export const useAltaIntl = () => {
  const intl = useIntl();
  const formatMessage = (key: string): string => {
    return intl.formatMessage({ id: key });
  };
  return {
    intl,
    formatMessage,
  };
};
