import { userConstants } from '../_contasts';

const initialState = { isLoading: false, errMess: null, data: null };

export function classify(state = initialState, action) {
  switch (action.type) {
    case userConstants.CLASSIFY_REQUEST:
      return { ...state, isLoading: true, errMess: null, data: null };

    case userConstants.CLASSIFY_SUCCESS:
      return { ...state, isLoading: false, errMess: null, data: action.payload };

    case userConstants.CLASSIFY_FAILURE:
      return { ...state, isLoading: false, errMess: action.payload, data: null };

    default:
      return state;
  }
}