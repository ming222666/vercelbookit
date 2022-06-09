import { useDispatch } from 'react-redux';

import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

type AppDispatch = ThunkDispatch<undefined, undefined, AnyAction>;

export default function useAppDispatch(): AppDispatch {
  const dispatch: AppDispatch = useDispatch();
  return dispatch;
}
