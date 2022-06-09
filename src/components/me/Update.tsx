import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toast } from 'react-toastify';

import ButtonLoader from '../Layout/ButtonLoader';
import { AppState } from '../../store';
import { AuthDispatch } from '../../components/Layout/Header';
import { updateUser } from '../../store/ducks/auth/action';

export default function UpdateProfile(): JSX.Element {
  const { user: userFromState, error, success, loading } = useSelector((state: AppState) => state.auth);

  const [user, setUser] = useState<{ name: string; email: string; password: string }>({
    name: userFromState ? userFromState.name : '',
    email: userFromState ? userFromState.email : '',
    password: '',
  });

  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState<string>(
    userFromState?.avatar && userFromState?.avatar.url ? userFromState.avatar.url : '/images/default_avatar.jpg',
  );

  const dispatch: AuthDispatch = useDispatch();

  const isSubmittedUpdate = useRef(false);

  useEffect(() => {
    if (userFromState) {
      // reflect user state into the form
      setUser({
        name: userFromState.name,
        email: userFromState.email,
        password: '',
      });
      userFromState.avatar?.url && setAvatarPreview(userFromState.avatar.url);
    }

    if (isSubmittedUpdate.current) {
      isSubmittedUpdate.current = false;
      if (success) toast.success('Profile successfully updated');
      if (error) toast.error(`Update Error: ${error.errormsg}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userFromState]);

  const submitHandler = async (e: React.SyntheticEvent<Element, Event>): Promise<void> => {
    e.preventDefault();
    isSubmittedUpdate.current = true;
    const userData = { ...user, avatar };
    dispatch(updateUser(userData));
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
            <h1 className="mb-3">Update Profile</h1>

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
                type="text"
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
              {loading ? <ButtonLoader /> : 'UPDATE'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
