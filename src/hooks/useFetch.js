import { useReducer } from 'react';
import ResultStatus from '../constants/RequestStatus';

const initialState = {
  status: ResultStatus.IDLE,
  error: false,
  data: {},
};

function useFetch(requestData) {
  console.log(requestData.url);
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = () => {
    console.log(requestData.body);
    dispatch({ type: ResultStatus.LOADING });
    fetch(requestData.url, {
      method: requestData.method,
      headers: requestData.headers,
      body: JSON.stringify(requestData.body),
    })
      .then((response) => {
        response
          .json()
          .then((res) => {
            dispatch({ payload: res, type: ResultStatus.SUCCESS });
          })
          .catch((err) => {
            console.log(`Error parsing response data: ${err}`);
          });
      })
      .catch((error) => {
        console.log(`Encountered Error with Fetch: ${error}`);
        dispatch({ type: ResultStatus.ERROR });
      });
  };

  return { state, fetchData };
}

function reducer(state, action) {
  switch (action.type) {
    case ResultStatus.LOADING:
      return { ...initialState, status: ResultStatus.LOADING };
    case ResultStatus.SUCCESS:
      return { ...initialState, status: ResultStatus.SUCCESS, data: action.payload };
    case ResultStatus.ERROR:
      return { ...initialState, status: ResultStatus.ERROR, error: true };
    default:
      return initialState;
  }
}

export default useFetch;
