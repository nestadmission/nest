const initState = {}

const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_PROJECT_SUCCESS':
      console.log('create project success');
      return state;
    case 'CREATE_PROJECT_ERROR':
      console.log('create project error');
      return state;
      case 'edit_PROJECT_SUCCESS':
        console.log('create project success');
        return state;
      case 'edit_PROJECT_ERROR':
        console.log('create project error');
        return state;
      case 'CREATE_NOTICE_SUCCESS':
        console.log('create project error');
        return {...state};
        case 'CREATE_NOTICE_ERROR':
        console.log('create project error');
        return state;

    default:
      return state;
  }
};

export default projectReducer;