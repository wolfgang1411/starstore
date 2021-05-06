import axios from "axios";
import { GET_DIRECTORY, DIRECTORY_ERROR } from "./types";

export const getDirectory = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/product/home/directory");
    dispatch({
      type: GET_DIRECTORY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: DIRECTORY_ERROR,
      payload: err.message,
    });
  }
};
