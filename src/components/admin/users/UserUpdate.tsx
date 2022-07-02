import React, { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { toast } from 'react-toastify';

import { AppState } from '../../../store';
import useAppDispatch from '../../../hooks/useAppDispatch';
import { getUserDetails } from '../../../store/ducks/admin/userDetails/action';
import { userUpdate } from '../../../store/ducks/admin/userUpdate/action';
import { UserDetailsActionType } from '../../../store/ducks/admin/userDetails/types';
import { UserUpdateActionType } from '../../../store/ducks/admin/userUpdate/types';
import { UserUpdateInfo } from '../../../store/ducks/admin/userUpdate/models/UserUpdateInfo';
import Loader from '../../../components/Layout/Loader';
import ButtonLoader from '../../../components/Layout/ButtonLoader';

export default function UserUpdate(): JSX.Element {
  const [name, setName] = useState<string | undefined>('');
  const [email, setEmail] = useState<string | undefined>('');
  const [role, setRole] = useState<string | undefined>('user');

  const {
    user: userFromDetails,
    error,
    /* loading, */ success,
  } = useSelector((state: AppState) => state.admin.userDetails);
  const { user } = useSelector((state: AppState) => state.auth);
  const {
    user: userFromUpdate,
    error: errorFromUpdate,
    loading: loadingFromUpdate,
    success: successFromUpdate,
  } = useSelector((state: AppState) => state.admin.userUpdate);

  const dispatch = useAppDispatch();
  const outcomeFetchUserDetails = useRef('');

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (user && user.role === 'admin') {
      dispatch(getUserDetails(id as string));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect((): void => {
    if (error) {
      outcomeFetchUserDetails.current = 'bad';
      dispatch({ type: UserDetailsActionType.USER_DETAILS_RESET_FAIL });
      toast.error(error.errormsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect((): void => {
    if (success) {
      outcomeFetchUserDetails.current = 'ok';

      dispatch({ type: UserDetailsActionType.USER_DETAILS_RESET_SUCCESS });

      setName(userFromDetails?.name);
      setEmail(userFromDetails?.email);
      setRole(userFromDetails?.role);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  useEffect((): (() => void) => {
    return () => {
      // so that when user revisits page,
      // an empty user is shown instead of user from
      // an earlier visit where update of user failed.
      dispatch({ type: UserUpdateActionType.USER_UPDATE_RESET });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect((): void => {
    if (errorFromUpdate) {
      dispatch({ type: UserUpdateActionType.USER_UPDATE_RESET_FAIL });
      toast.error(errorFromUpdate.errormsg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorFromUpdate]);

  useEffect((): void => {
    if (successFromUpdate) {
      router.push('/admin/users?updated=yes');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successFromUpdate]);

  useEffect((): void => {
    if (userFromUpdate) {
      setName(userFromUpdate?.name);
      setEmail(userFromUpdate?.email);
      setRole(userFromUpdate?.role);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userFromUpdate]);

  const submitHandler = async (e: React.SyntheticEvent<Element, Event>): Promise<void> => {
    e.preventDefault();

    const userData: UserUpdateInfo = {
      name: name?.trim() || '',
      email: email?.trim() || '',
      role: role?.trim() || '',
    };

    dispatch(userUpdate(id as string, userData));
  };

  return (
    <>
      {user && user.role === 'admin' ? (
        !outcomeFetchUserDetails.current ? (
          <Loader />
        ) : outcomeFetchUserDetails.current !== 'ok' ? (
          'Error while fetching user details'
        ) : (
          <div className="container container-fluid">
            <div className="row wrapper">
              <div className="col-10 col-lg-8">
                <form className="shadow-lg" onSubmit={submitHandler} encType="multipart/form-data">
                  <h1 className="mb-4">Update User</h1>
                  <div className="form-group">
                    <label htmlFor="name_field">Name</label>
                    <input
                      type="text"
                      id="name_field"
                      className="form-control"
                      value={name}
                      onChange={(e): void => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email_field">Email</label>
                    <input
                      type="text"
                      id="email_field"
                      className="form-control"
                      value={email}
                      onChange={(e): void => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="role_field">Role</label>
                    <select
                      className="form-control"
                      id="user_type_field"
                      value={role}
                      onChange={(e): void => setRole(e.target.value)}
                    >
                      {['user', 'admin'].map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button type="submit" className="btn btn-block new-room-btn py-3" disabled={loadingFromUpdate}>
                    {loadingFromUpdate ? <ButtonLoader /> : 'UPDATE'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )
      ) : user ? (
        'Admin role is required to view page'
      ) : (
        <Loader />
      )}
    </>
  );
}
