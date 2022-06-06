import React, { useState } from 'react';
import { signIn, SignInResponse } from 'next-auth/react';

import axios from 'axios';
import { toast } from 'react-toastify';

import ButtonLoader from '../Layout/ButtonLoader';
import IRegisterUserFormData from '../../controllers/interfaces/IRegisterUserFormData';
import { IErrorDto } from '../../db/interfaces';
import { getError } from '../../utils/getAxiosError';

export default function Register(): JSX.Element {
  const [user, setUser] = useState<{ name: string; email: string; password: string }>({
    name: '',
    email: '',
    password: '',
  });

  const [avatar, setAvatar] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg');

  const [loading, setLoading] = useState(false);

  const signInUser = async (
    email: string,
    password: string,
    redirect = false,
  ): Promise<SignInResponse | undefined | Error> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result = await signIn<any>('credentials', {
        redirect,
        email: email,
        password: password,
      });
      return result;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('error', error);
      return new Error((error as Error).message);
    }
  };

  const registerUser = async (userData: IRegisterUserFormData): Promise<void> => {
    try {
      setLoading(true);

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      await axios.post<{ status: number } | IErrorDto>('/api/auth/register', userData, config);

      const result = await signInUser(userData.email, userData.password);

      if (result instanceof Error) {
        setLoading(false);
        toast.error(result.message);
        return;
      } else if (result && result.error) {
        setLoading(false);
        toast.error(result.error);
        return;
      }
      toast.success('Successfully registered!', {
        onClose: (): void => {
          window.location.href = '/';
        },
      });
    } catch (error) {
      setLoading(false);
      const err = getError(error);
      toast.error(err.errormsg);
    }
  };

  const submitHandler = async (e: React.SyntheticEvent<Element, Event>): Promise<void> => {
    e.preventDefault();
    const userData = { ...user, avatar };
    await registerUser(userData);
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
