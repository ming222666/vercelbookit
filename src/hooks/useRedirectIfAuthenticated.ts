import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { AppState } from '../store';

export default function useRedirectIfAuthenticated(): boolean {
  const router = useRouter();
  const isMounted = useRef(false);
  const redirectIfAuthenticated = useRef(false);
  const { user } = useSelector((state: AppState) => state.auth);

  useEffect((): void => {
    if (user) {
      redirectIfAuthenticated.current = true;
      router.push('/');
      return;
    }
    if (isMounted.current) {
      redirectIfAuthenticated.current = false;
    }
  }, [router, user]);
  useEffect((): void => {
    isMounted.current = true;
  }, []);

  if (redirectIfAuthenticated.current) return true;
  return false;
}
