import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { toast } from 'react-toastify';

import useAppDispatch from '../../hooks/useAppDispatch';
import { AppState } from '../../store';
import { resetPassword } from '../../store/ducks/password/action';
import ButtonLoader from '../Layout/ButtonLoader';

export default function NewPassword(): JSX.Element {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useAppDispatch();
  const router = useRouter();

  const { error, success, loading } = useSelector((state: AppState) => state.password);

  useEffect((): void => {
    if (error) {
      toast.error(error.errormsg);
    }
    if (success) {
      router.push('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, success]);

  const submitHandler = async (e: React.SyntheticEvent<Element, Event>): Promise<void> => {
    e.preventDefault();
    dispatch(resetPassword(router.query.token as string, newPassword, confirmPassword));
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandler}>
          <h1 className="mb-3">New Password</h1>

          <div className="form-group">
            <label htmlFor="password_field">Password</label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              value={newPassword}
              onChange={(e): void => setNewPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirm_password_field">Confirm Password</label>
            <input
              type="password"
              id="confirm_password_field"
              className="form-control"
              value={confirmPassword}
              onChange={(e): void => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            id="new_password_button"
            type="submit"
            className="btn btn-block py-3"
            disabled={loading ? true : false}
          >
            {loading ? <ButtonLoader /> : 'Set Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
