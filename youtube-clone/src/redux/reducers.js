const initialState = {
    videos: [],
  };
  
  const videoReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_VIDEOS':
        return { ...state, videos: action.payload };
      default:
        return state;
    }
  };
  
  export default videoReducer;
  