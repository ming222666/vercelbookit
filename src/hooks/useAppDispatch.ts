import { useDispatch } from 'react-redux';

import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AppDispatch = ThunkDispatch<any, undefined, AnyAction>;

export default function useAppDispatch(): AppDispatch {
  const dispatch: AppDispatch = useDispatch();
  return dispatch;
}
