import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useSelector } from 'react-redux';

import { toast } from 'react-toastify';

import ButtonLoader from '../Layout/ButtonLoader';
import { AppState } from '../../store';

export default function Login(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { redirect } = router.query;

  const { user } = useSelector((state: AppState) => state.auth);

  useEffect((): void => {
    if (user) router.push('/');
  }, [router, user]);

  const submitHandler = async (e: React.SyntheticEvent<Element, Event>): Promise<void> => {
    e.preventDefault();

    setLoading(true);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await signIn<any>('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result && result.error) {
      setLoading(false);
      toast.error(result.error);
    } else {
      redirect ? (window.location.href = redirect as string) : (window.location.href = '/ ');
    }
  };

  return (
    <div className="container container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Login</h1>
            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                value={email}
                onChange={(e): void => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                value={password}
                onChange={(e): void => setPassword(e.target.value)}
              />
            </div>

            <Link href="/password/forgot">
              <a className="float-right mb-4">Forgot Password?</a>
            </Link>

            <button id="login_button" type="submit" className="btn btn-block py-3" disabled={loading}>
              {loading ? <ButtonLoader /> : 'LOGIN'}
            </button>

            <Link href="/register">
              <a className="float-right mt-3">New User?</a>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
