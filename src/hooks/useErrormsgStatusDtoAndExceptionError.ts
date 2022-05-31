import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import { toast } from 'react-toastify';

import { IErrormsgStatusDto } from '../db/interfaces';
import { clearError } from '../store/ducks/exceptionError/action';

export default function useErrormsgStatusDtoAndExceptionError(
  errormsgStatus: IErrormsgStatusDto | null,
  exceptionError: string,
  dispatch: Dispatch,
): void {
  // const dispatch = useDispatch();

  useEffect(() => {
    if (errormsgStatus) {
      toast.error(errormsgStatus.errormsg);
    }
  }, [errormsgStatus]);

  useEffect(() => {
    if (exceptionError) {
      toast.error(exceptionError, {
        onClose: () => {
          dispatch(clearError());
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exceptionError]);
}
