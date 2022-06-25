import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

import axios from 'axios';
import { toast } from 'react-toastify';

import useAppDispatch from '../../hooks/useAppDispatch';
import { AppState } from '../../store';
import { loadUser } from '../../store/ducks/auth/action';
import { getError } from '../../utils/getAxiosError';

export function Header(): JSX.Element {
  // https://stackoverflow.com/questions/59800913/type-safe-usedispatch-with-redux-thunk
  const dispatch = useAppDispatch();
  const { user, error, loading } = useSelector((state: AppState) => state.auth);

  const userRef = useRef(user);

  useEffect(
    (): void => {
      userRef.current = user;

      async function fetchUser(): Promise<void> {
        await dispatch(loadUser());
      }

      if (!user) {
        // fetchUser();
        const t = setTimeout(() => {
          fetchUser();
          clearTimeout(t);
        }, 200);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user],
  );

  useEffect((): void => {
    if (error) {
      if (error.errormsg !== 'Session not found') {
        toast.error(error.errormsg);
      }
    }
  }, [error]);

  useEffect((): (() => void) => {
    // https://stackoverflow.com/questions/52744866/react-js-ability-to-detect-switching-tab-in-browser
    /* eslint-disable @typescript-eslint/no-explicit-any */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const hidden =
      typeof window === 'undefined'
        ? null
        : typeof document.hidden !== 'undefined'
        ? 'hidden'
        : typeof (document as any).msHidden !== 'undefined'
        ? 'msHidden'
        : typeof (document as any).webkitHidden !== 'undefined'
        ? 'webkitHidden'
        : null;

    const visibilityChange =
      typeof window === 'undefined'
        ? null
        : typeof document.hidden !== 'undefined'
        ? 'visibilitychange'
        : typeof (document as any).msHidden !== 'undefined'
        ? 'msvisibilitychange'
        : typeof (document as any).webkitHidden !== 'undefined'
        ? 'webkitvisibilitychange'
        : null;

    function onReveal(): void {
      if (!document.hidden) {
        axios
          .get<{ _id: string; updatedAt: number }>('/api/isAuth')
          .then((res) => {
            // user logout and re-logined as different user in another tab
            if (res.data._id !== userRef.current?._id) {
              window.location.href = window.location.href;
              return;
            }
            // user changed profile in another tab
            if (res.data.updatedAt !== userRef.current?.updatedAt) {
              window.location.href = window.location.href;
              return;
            }
          })
          .catch((error) => {
            const err = getError(error);

            if (err.errormsg !== 'Session not found') {
              toast.error(err.errormsg);
            }
            // user logout in another tab
            if (userRef.current) {
              window.location.href = window.location.href;
            }
          });
      }
    }

    document.addEventListener(visibilityChange as any, onReveal, false);

    return function (): void {
      document.removeEventListener(visibilityChange as any, onReveal);
    };
    /* eslint-enable @typescript-eslint/no-explicit-any */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logoutHandler = (): void => {
    signOut({
      callbackUrl: '/',
    });
  };

  return (
    <nav className="navbar row justify-content-center sticky-top" style={{ minHeight: '4.2rem' }}>
      <div className="container">
        <div className="col-3 p-0">
          <div className="navbar-brand">
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <Link href="/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img style={{ cursor: 'pointer' }} src="/images/bookit_logo.png" alt="BookIT" />
            </Link>
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
              {!loading && (
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
