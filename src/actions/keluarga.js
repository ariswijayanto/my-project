
import { DATA_KELUARGA } from "./actionTypes";

export const setKeluarga = (flagSubmitKeluarga) => dispatch => {
  dispatch({ type: DATA_KELUARGA,payload:{flagSubmitKeluarga} });
};
