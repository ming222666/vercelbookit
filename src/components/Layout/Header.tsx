import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/Link';
import { signOut } from 'next-auth/react';

import { toast } from 'react-toastify';

import useAppDispatch from '../../hooks/useAppDispatch';
import { AppState } from '../../store';
import { loadUser } from '../../store/ducks/auth/action';

export function Header(): JSX.Element {
  // https://stackoverflow.com/questions/59800913/type-safe-usedispatch-with-redux-thunk
  const dispatch = useAppDispatch();
  const { user, error, loading } = useSelector((state: AppState) => state.auth);

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

  const logoutHandler = (): void => {
    signOut({
      callbackUrl: '/',
    });
  };

  return (
    <nav className="navbar row justify-content-center sticky-top">
      <div className="container">
        <div className="col-3 p-0">
          <div className="navbar-brand">
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img style={{ cursor: 'pointer' }} src="/images/bookit_logo.png" alt="BookIT" />
            </a>
          </div>
        </div>

        <div className="col-3 mt-3 mt-md-0 text-center">
          {user ? (
            <div className="ml-4 dropdown d-line">
              {/* eslint-disable-next-line jsx-a11y/role-supports-aria-props */}
              <a
                href="#"
                className="btn dropdown-toggle mr-4"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar avatar-nav">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={user.avatar && user.avatar.url} alt={user.name} className="rounded-circle" />
                </figure>
                <span>{user.name}</span>
              </a>

              <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">
                <Link href="/bookings/me">
                  <a className="dropdown-item">My Bookings</a>
                </Link>

                <Link href="/me/update">
                  <a className="dropdown-item">Profile</a>
                </Link>

                <Link href="/">
                  <a className="dropdown-item text-danger" onClick={logoutHandler}>
                    Logout
                  </a>
                </Link>
              </div>
            </div>
          ) : (
            <>
              {loading ? null : (
                <Link href="/login">
                  <a className="btn btn-danger px-4 text-white login-header-btn float-right">Login</a>
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
