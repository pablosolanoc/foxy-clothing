
// import SHOP_DATA from './shop.data.js';

import shopActionTypes from './shop.types.js';

const INITIAL_STATE = {
    // collections: SHOP_DATA
    collections: null,
    isFetching: false,
    errorMessage: undefined
};

const shopReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case shopActionTypes.FETCH_COLLECTIONS_START:
            return {
                ...state,
                isFetching: true
            }
        case shopActionTypes.FETCH_COLLECTIONS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                collections: action.payload
            }
        case shopActionTypes.FECTH_COLLECTIONS_FAILURE:
            return{
                ...state,
                isFetching: false,
                errorMessage: action.payload
            }
        // case shopActionTypes.UPDATE_COLLECTIONS:
        //     return {
        //         ...state,
        //         collections:  action.payload
        //     }
        
        default:
            return state
    }
}

export default shopReducer;