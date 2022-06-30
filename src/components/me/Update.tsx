import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { toast } from 'react-toastify';

import ButtonLoader from '../Layout/ButtonLoader';
import useAppDispatch from '../../hooks/useAppDispatch';
import { AppState } from '../../store';
import { loadUser, updateUser } from '../../store/ducks/auth/action';
import { AuthActionType } from '../../store/ducks/auth/types';

export default function UpdateProfile(): JSX.Element {
  const { user: userFromState, loading, userUpdate } = useSelector((state: AppState) => state.auth);

  const [user, setUser] = useState<{ name: string; email: string; password: string }>({
    name: userFromState ? userFromState.name : '',
    email: userFromState ? userFromState.email : '',
    password: '',
  });

  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState<string>(
    userFromState?.avatar && userFromState?.avatar.url ? userFromState.avatar.url : '/images/default_avatar.jpg',
  );

  const dispatch = useAppDispatch();

  const isRefreshOnMount = useRef(false);

  useEffect(() => {
    if (userFromState) {
      // refresh user state, fetch latest
      isRefreshOnMount.current = true;
      dispatch(loadUser());
      return;
    }
    // Header will perform fetch... so just sit back and listen to pending user state change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (userFromState) {
      if (isRefreshOnMount.current) {
        // do not bother filling form with existing userFromState...
        // cos state will be overwritten by loadUser() above
        isRefreshOnMount.current = false; // reset
        return;
      }
      // reflect user state into the form
      setUser({
        name: userFromState.name,
        email: userFromState.email,
        password: '',
      });
      userFromState.avatar?.url && setAvatarPreview(userFromState.avatar.url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userFromState]);

  useEffect(() => {
    if (userUpdate.success) {
      dispatch({ type: AuthActionType.UPDATE_USER_RESET_SUCCESS });
      toast.success('Profile successfully updated');
    }
    if (userUpdate.error) {
      dispatch({ type: AuthActionType.UPDATE_USER_RESET_FAIL });
      toast.error(`Update Error: ${userUpdate.error.errormsg}`);
    }
  }, [dispatch, userUpdate]);

  const submitHandler = async (e: React.SyntheticEvent<Element, Event>): Promise<void> => {
    e.preventDefault();
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
        try {
          reader.readAsDataURL(e.target.files[0]);
        } catch {}
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
                    disabled={loading || userUpdate.loading}
                    onChange={onChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

            <button
              id="login_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading || userUpdate.loading}
            >
              {loading || userUpdate.loading ? <ButtonLoader /> : 'UPDATE'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
