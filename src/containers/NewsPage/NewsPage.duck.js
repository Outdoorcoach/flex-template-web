import contentfulClient from '../../util/contentful';




// ================ Action types ================ //

export const GET_POSTS_REQUEST = 'app/NewsPage/GET_POSTS_REQUEST';
export const GET_MORE_POSTS_REQUEST = 'app/NewsPage/GET_MORE_POSTS_REQUEST';
export const GET_POSTS_SUCCESS = 'app/NewsPage/GET_POSTS_SUCCESS';
export const GET_POSTS_ERROR = 'app/NewsPage/GET_POSTS_ERROR';


// ================ Reducer ================ //

const initialState = {
  pagination: null,
  queryParams: null,
  fetchInProgress: false,
  fetchPostsError: null,
  posts: [],
};


const newsPageReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS_REQUEST:
      return {
        ...state,
        fetchInProgress: true,
        fetchPostsError: null,
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: payload.postsData,
        fetchInProgress: false,
      };
    case GET_POSTS_ERROR:
      // eslint-disable-next-line no-console
      console.error(payload);
      return { ...state, fetchInProgress: false, fetchPostsError: payload };

    case GET_MORE_POSTS_REQUEST:
      return {
        ...state,
        queryParams: payload.queryParams,
        fetchInProgress: true,
        fetchPostsError: null,
      };
    default:
      return state;
  }
};

export default newsPageReducer;

// ================ Action creators ================ //

export const getPostsRequest = queryParams => ({
  type: GET_POSTS_REQUEST,
  payload: { queryParams },
});

export const getPostsSuccess = postsData => ({

  type: GET_POSTS_SUCCESS,
  payload: { postsData },
});

export const getPostsError = e => ({
  type: GET_POSTS_ERROR,
  error: true,
  payload: e,
});

export const getMorePostsRequest = queryParams => ({
  type: GET_MORE_POSTS_REQUEST,
  payload: { queryParams },
});



export const getPosts = () => (dispatch) => {
  let queryParams = {
    page: 1
  }
  dispatch(getPostsRequest(queryParams));

  

  contentfulClient
  .getEntries({
    content_type: "blogPost"
  })
  .then(response => {
    console.log(response);
    const posts = response.items;
    dispatch(getPostsSuccess(posts));
    return posts;
  })
  .catch(e => dispatch(getPostsError(e)));

}

export const loadData = () => (dispatch) => {
  // Clear state so that previously loaded data is not visible
  // in case this page load fails.

  return Promise.all([
    dispatch(getPosts()),
  ]);
};
