import React, { useState } from 'react';
// import Head from 'next/head';
import { signIn } from 'next-auth/react';

import { toast } from 'react-toastify';

export default function Login(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e: React.SyntheticEvent<Element, Event>): Promise<void> => {
    e.preventDefault();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await signIn<any>('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result && result.error) {
      toast.error(result.error);
    } else {
      window.location.href = '/';
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

            <a href="#" className="float-right mb-4">
              Forgot Password?
            </a>

            <button id="login_button" type="submit" className="btn btn-block py-3">
              LOGIN
            </button>

            <a href="#" className="float-right mt-3">
              New User?
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}
