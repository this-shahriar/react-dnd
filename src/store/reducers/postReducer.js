const initial = { allPosts: [], raw: [], processed: [], hoverIndex: 0 };

export const postReducer = (state = initial, action) => {
  switch (action.type) {
    case "FETCH":
      return {
        ...state,
        allPosts: action?.value,
        raw: action?.value,
      };
    case "TORAW":
      state?.raw?.splice(
        state?.hoverIndex,
        0,
        ...state?.processed?.filter((item) => item?.id === action?.value)
      );
      return {
        ...state,
        // raw: [
        //   ...state?.raw,
        //   ...state?.processed?.filter((item) => item?.id === action?.value),
        // ],
        raw: [...state?.raw],
        processed: state?.processed?.filter(
          (item) => item?.id !== action?.value
        ),
      };
    case "PROCESS":
      return {
        ...state,
        processed: [
          ...state?.processed,
          ...state?.raw?.filter((item) => item?.id === action?.value),
        ],
        raw: state?.raw?.filter((item) => item?.id !== action?.value),
      };
    case "HOVER":
      return {
        ...state,
        hoverIndex: action?.value,
      };
    case "DELETE":
      return {
        ...state,
        allPosts: state.allPosts?.filter((item) => item?.id !== action.value),
      };
    default:
      return state;
  }
};
