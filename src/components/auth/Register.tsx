import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { ThunkDispatch } from 'redux-thunk';

import { toast } from 'react-toastify';

import ButtonLoader from '../Layout/ButtonLoader';
import { registerUser, clearError } from '../../store/ducks/auth/action';
import { clearExceptionError } from '../../store/ducks/exceptionError/action';
import { ExceptionErrorActionType } from '../../store/ducks/exceptionError/types';
import { AuthAction } from '../../store/ducks/auth/types';
import { AuthState } from '../../store/ducks/auth/models/AuthState';
import { AppState } from '../../store';

export default function Register(): JSX.Element {
  const dispatch = useDispatch();
  const router = useRouter();

  const [user, setUser] = useState<{ name: string; email: string; password: string }>({
    name: '',
    email: '',
    password: '',
  });

  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg');

  const { success, error, loading } = useSelector((state: AppState) => state.auth);
  const exceptionError = useSelector((state: AppState) => state.exceptionError);

  useEffect((): void => {
    if (success) {
      router.push('/login');
    }

    if (error) {
      toast.error(error.errormsg);
      dispatch(clearError());
    }

    if (exceptionError) {
      toast.error(exceptionError);
      dispatch(clearExceptionError());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, error, exceptionError]);

  const submitHandler = async (e: React.SyntheticEvent<Element, Event>): Promise<void> => {
    e.preventDefault();

    const userData = { ...user, avatar };

    const x = await (dispatch as ThunkDispatch<AuthState, undefined, AuthAction>)(registerUser(userData));

    if (x instanceof Error) {
      dispatch({
        type: ExceptionErrorActionType.SET_ERROR,
        payload: x.message,
      });
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.name === 'avatar') {
      const reader = new FileReader();

      reader.onload = (): void => {
        if (reader.readyState === 2) {
          setAvatar(reader.result as string);
          setAvatarPreview(reader.result as string);
        }
      };

      if (e.target.files) {
        reader.readAsDataURL(e.target.files[0]);
      }
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="container container-fluid">
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={submitHandler}>
            <h1 className="mb-3">Join Us</h1>

            <div className="form-group">
              <label htmlFor="name_field">Full Name</label>
              <input
                type="text"
                id="name_field"
                className="form-control"
                name="name"
                value={user.name}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email_field">Email</label>
              <input
                type="email"
                id="email_field"
                className="form-control"
                name="email"
                value={user.email}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password_field">Password</label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                name="password"
                value={user.password}
                onChange={onChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="avatar_upload">Avatar</label>
              <div className="d-flex align-items-center">
                <div>
                  <figure className="avatar mr-3 item-rtl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={avatarPreview} className="rounded-circle" alt="image" />
                  </figure>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    name="avatar"
                    className="custom-file-input"
                    id="customFile"
                    accept="images/*"
                    onChange={onChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

            <button id="login_button" type="submit" className="btn btn-block py-3" disabled={loading}>
              {loading ? <ButtonLoader /> : 'REGISTER'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
