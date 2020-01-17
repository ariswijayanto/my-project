import { DATA_KELUARGA } from "../actions/actionTypes";


const initialState = {
  data: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case DATA_KELUARGA:
      return {
        ...state,
        data: {...payload}
      };
    default:
      return state;
  }
};
