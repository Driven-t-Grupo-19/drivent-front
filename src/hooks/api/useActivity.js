import useAsync from '../useAsync';

import * as activityApi from '../../services/activityApi';
import useToken from '../useToken';

export default function useHotel() {
  const token = useToken();

  const {
    data: activities = [],
    loading: activitiesLoading,
    error: acitivitiesError,
    act: getAcitivity
  } = useAsync(() => activityApi.getActivities(token));

  return {
    activities,
    activitiesLoading,
    acitivitiesError,
    getAcitivity
  };
}
