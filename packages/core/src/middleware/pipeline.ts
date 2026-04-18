import type { Middleware, SDKRequest, SDKResponse } from '../types/config.js';

export function compose(...middlewares: Middleware[]): Middleware {
  return async (
    request: SDKRequest,
    next: (request: SDKRequest) => Promise<SDKResponse<unknown>>,
  ): Promise<SDKResponse<unknown>> => {
    let index = -1;

    const dispatch = async (i: number): Promise<SDKResponse<unknown>> => {
      if (i <= index) {
        throw new Error('next() called multiple times');
      }
      index = i;

      const fn = middlewares[i];
      if (!fn) {
        return next(request);
      }

      return fn(request, (req) => dispatch(i + 1));
    };

    return dispatch(0);
  };
}
