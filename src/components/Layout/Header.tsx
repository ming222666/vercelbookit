import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import Link from 'next/Link';

import { toast } from 'react-toastify';

import { AppState } from '../../store';
import { AuthState } from '../../store/ducks/auth/models/AuthState';
import { loadUser } from '../../store/ducks/auth/action';

type AuthDispatch = ThunkDispatch<AuthState, undefined, AnyAction>;

export function Header(): JSX.Element {
  // https://stackoverflow.com/questions/59800913/type-safe-usedispatch-with-redux-thunk
  const dispatch: AuthDispatch = useDispatch();
  const { user, error, success, loading } = useSelector((state: AppState) => state.auth);

  useEffect((): void => {
    async function fetchUser(): Promise<void> {
      await dispatch(loadUser());
    }
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect((): void => {
    if (error) {
      if (error.errormsg !== 'Session not found') {
        toast.error(error.errormsg);
      }
    }
  }, [error]);

  return (
    <nav className="navbar row justify-content-center sticky-top">
      <div className="container">
        <div className="col-3 p-0">
          <div className="navbar-brand">
            <Link href="/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img style={{ cursor: 'pointer' }} src="/images/bookit_logo.png" alt="BookIT" />
            </Link>
          </div>
        </div>

        <div className="col-3 mt-3 mt-md-0 text-center">
          {success && user ? (
            'Hi ' + user.name
          ) : (
            <Link href={loading ? '#' : '/login'}>
              <a className={`btn btn-danger px-4 text-white login-header-btn float-right${loading ? ' disabled' : ''}`}>
                Login
              </a>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
