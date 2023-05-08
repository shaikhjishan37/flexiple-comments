import { APP_CONSTANT } from '../constants/AppConstants';

const initialState = {
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case APP_CONSTANT.INIT_APP:
            return {
                ...state,
                appData: {
                    showMask: false
                }
            }
        default:
            return state;
    }
};

export default appReducer;