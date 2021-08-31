
// import SHOP_DATA from './shop.data.js';

import shopActionTypes from './shop.types.js';

const INITIAL_STATE = {
    // collections: SHOP_DATA
    collections: null
};

const shopReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case shopActionTypes.UPDATE_COLLECTIONS:
            return {
                ...state,
                collections:  action.payload
            }
        default:
            return state
    }
}

export default shopReducer;