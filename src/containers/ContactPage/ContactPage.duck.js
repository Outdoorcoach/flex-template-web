import contentfulClient from '../../util/contentful';


// ================ Action types ================ //


export const FETCH_CONTACTPAGEDATA_REQUEST = 'app/ContactPage/FETCH_CONTACTPAGEDATA_REQUEST';
export const FETCH_CONTACTPAGEDATA_SUCCESS = 'app/ContactPage/FETCH_CONTACTPAGEDATA_SUCCESS';
export const FETCH_CONTACTPAGEDATA_ERROR = 'app/ContactPage/FETCH_CONTACTPAGEDATA_ERROR';
export const SET_INITIAL_STATE = 'app/ContactPage/SET_INITIAL_STATE';

// ================ Reducer ================ //

const initialState = {
  contactPageEntryId: null,
  contactPageFetched: false,
  contactPageData: {},
  contactPageFetchError: null,
};

export default function ContactPageReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case SET_INITIAL_STATE:
      return { ...initialState };
    case FETCH_CONTACTPAGEDATA_REQUEST:
      return { ...state, contactPageFetchError: null, contactPageEntryId: payload };
    case FETCH_CONTACTPAGEDATA_SUCCESS:
      return { ...state, contactPageData: payload.entryData, contactPageFetched: true };
    case FETCH_CONTACTPAGEDATA_ERROR:
      return { ...state, contactPageFetchError: true };
    default:
      return state;
  }
}

// ================ Action creators ================ //
export const setInitialState = () => ({
  type: SET_INITIAL_STATE,
});

const fetchContactPageDataRequest = entryId => ({
  type: FETCH_CONTACTPAGEDATA_REQUEST,
  payload: { entryId }
});

export const fetchContactPageDataSuccess = entryData => ({
  type: FETCH_CONTACTPAGEDATA_SUCCESS,
  payload: { entryData },
});

const fetchContactPageDataError = e => ({
  type: FETCH_CONTACTPAGEDATA_ERROR,
  error: true,
  payload: e,
});
// ================ Thunks ================ //

export const fetchContactPageData = entryId => (dispatch, getState) => {

  dispatch(fetchContactPageDataRequest());
  contentfulClient.getEntry(entryId)
    .then(response => {

      const entryData = response.fields;


      dispatch(fetchContactPageDataSuccess(entryData));
      return entryData;
    })
    .catch(e => dispatch(fetchContactPageDataError(e)));

};

export const loadData = entryId => (dispatch, getState, sdk) => {
  // Clear state so that previously loaded data is not visible
  // in case this page load fails.
  dispatch(setInitialState(entryId));

  return Promise.all([
    dispatch(fetchContactPageData(entryId)),
  ]);
};
