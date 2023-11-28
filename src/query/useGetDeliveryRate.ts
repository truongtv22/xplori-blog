import { useQuery } from 'react-query';

import { getDeliveryRate } from '@/services/api';

const GET_DELIVERY_RATE = 'GET_DELIVERY_RATE';

export const useGetDeliveryRate = () => {
  return useQuery([GET_DELIVERY_RATE], () => getDeliveryRate(), {
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    retry: 0,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
};
