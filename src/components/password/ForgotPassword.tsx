import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { toast } from 'react-toastify';

import useAppDispatch from '../../hooks/useAppDispatch';
import { AppState } from '../../store';
import { forgotPassword } from '../../store/ducks/password/action';
import ButtonLoader from '../Layout/ButtonLoader';

export default function ForgotPassword(): JSX.Element {
  const [email, setEmail] = useState('');

  const dispatch = useAppDispatch();

  const { error, success, loading } = useSelector((state: AppState) => state.password);

  useEffect((): void => {
    if (error) {
      toast.error(error.errormsg);
    }
    if (success) {
      toast.success('Email sent to ' + email.trim());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, success]);

  const submitHandler = async (e: React.SyntheticEvent<Element, Event>): Promise<void> => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandler}>
          <h1 className="mb-3">Forgot Password</h1>
          <div className="form-group">
            <label htmlFor="email_field">Enter Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              value={email}
              onChange={(e): void => setEmail(e.target.value)}
            />
          </div>

          <button id="forgot_password_button" type="submit" className="btn btn-block py-3" disabled={loading}>
            {loading ? <ButtonLoader /> : 'Send Email'}
          </button>
        </form>
      </div>
    </div>
  );
}
