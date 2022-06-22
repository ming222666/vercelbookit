import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { AppState } from '../store';

export default function useRedirectToLoginIfNotAuthenticated(): boolean {
  const router = useRouter();
  const isMounted = useRef(false);
  const redirectToLoginIfNotAuthenticated = useRef(false);
  const { error } = useSelector((state: AppState) => state.auth);

  useEffect((): void => {
    // if (error && error.errormsg === 'Session not found') {
    if (error) {
      redirectToLoginIfNotAuthenticated.current = true;
      router.push('/login?redirect=' + router.pathname);
      return;
    }
    if (isMounted.current) {
      redirectToLoginIfNotAuthenticated.current = false;
    }
  }, [router, error]);
  useEffect((): void => {
    isMounted.current = true;
  }, []);

  if (redirectToLoginIfNotAuthenticated.current) return true;
  return false;
}
