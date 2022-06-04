import axios, { AxiosError } from 'axios';

import { IErrorDto } from '../db/interfaces';

export function getError(err: unknown): IErrorDto {
  if (axios.isAxiosError(err)) {
    const axErr: AxiosError = err;
    if (axErr.response?.data && axErr.response?.data.errormsg) {
      const status: number = axErr.response.data.status;
      if (status >= 500) {
        // errormsg above is server generated, potentially technical revealing...
        return {
          errormsg: 'Internal Server Error',
          status,
          internalServerErrorText: axErr.response?.data.errormsg,
          exceptionErrorText: '',
        };
      }
      // (401/404) User not found. (400) Validation error e.g. Age mustn't exceed 99 ...
      return {
        errormsg: axErr.response.data.errormsg,
        status,
        internalServerErrorText: '',
        exceptionErrorText: '',
      };
    }
  }

  // Browser issued
  const error = (err as Error).message.toLowerCase();

  const posOfStatusCode = error.indexOf('status code');

  if (posOfStatusCode !== -1) {
    if (error.indexOf('404') !== -1) {
      return {
        errormsg: 'Invalid resource url',
        status: 404,
        internalServerErrorText: '',
        exceptionErrorText: '',
      };
    }
    if (error.indexOf('401') !== -1) {
      return {
        errormsg: 'Unauthorized access not permitted',
        status: 401,
        internalServerErrorText: '',
        exceptionErrorText: '',
      };
    }
    if (error.indexOf('400') !== -1) {
      return {
        errormsg: 'Bad request',
        status: 400,
        internalServerErrorText: '',
        exceptionErrorText: '',
      };
    }
    if (error.indexOf('500') !== -1) {
      return {
        errormsg: 'Internal Server Error',
        status: 500,
        internalServerErrorText: 'Internal Server Error',
        exceptionErrorText: '',
      };
    }
    if (error.indexOf('501') !== -1) {
      return {
        errormsg: 'Internal Server Error',
        status: 501,
        internalServerErrorText: 'Internal Server Error',
        exceptionErrorText: '',
      };
    }

    // eslint-disable-next-line no-console
    console.log('error', error);

    // extract XXX from error string e.g. "Request failed with status code XXX"
    const statusCode = parseInt(error.substr(posOfStatusCode + 'status code '.length, 3));

    return {
      errormsg: error,
      status: statusCode,
      internalServerErrorText: '',
      exceptionErrorText: '',
    };
  }

  // eslint-disable-next-line no-console
  console.log('err', err);
  // due to e.g. await axios.TYPOget() instead of await axios.get()
  return {
    errormsg: 'Exception error',
    status: 999,
    internalServerErrorText: '',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    exceptionErrorText: (err as any).message,
  };
}
