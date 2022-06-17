import { loadStripe } from '@stripe/stripe-js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let stripePromise: Promise<any>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getStripe = (): Promise<any> => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY as string);
  }
  return stripePromise;
};

export default getStripe;
