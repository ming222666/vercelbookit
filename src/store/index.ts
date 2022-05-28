import { createStore, applyMiddleware } from 'redux';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';

import * as reducers from './ducks';
import { BaseAction } from './BaseAction';

const rootReducer = combineReducers(reducers);

export type AppState = ReturnType<typeof rootReducer>;

const initialState = {};

const middleware = [thunk];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer: typeof rootReducer = (state: any, action: BaseAction): AppState => {
  if (action.type === HYDRATE) {
    const nextState = { ...state, ...action.payload };
    return nextState;
  }
  return rootReducer(state, action as never);
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const initialStore = () =>
  createStore(
    reducer,
    initialState,
    process.env.NODE_ENV !== 'production'
      ? // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('redux-devtools-extension').composeWithDevTools(applyMiddleware(...middleware))
      : applyMiddleware(...middleware),
  );

export const wrapper = createWrapper(initialStore);
