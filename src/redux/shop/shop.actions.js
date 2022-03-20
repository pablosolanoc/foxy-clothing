import shopActionTypes from "./shop.types";

import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';
// export const updateCollections = (collectionsMap) => ({
//     type: shopActionTypes.UPDATE_COLLECTIONS,
//     payload: collectionsMap
// });

export const fecthCollectionsStart = () => ({
    type: shopActionTypes.FETCH_COLLECTIONS_START
});

export const fecthCollectionsSuccess = collectionsMap => ({
    type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const fecthCollectionsFailure = errorMessage => ({
    type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: errorMessage
});

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        
        const collectionRef = firestore.collection('collections');
        dispatch(fecthCollectionsStart());
        
        collectionRef.get()
        .then(snapshot => {
            
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            dispatch(fecthCollectionsSuccess(collectionsMap));
            console.log(collectionsMap);
            // updateCollections(collectionsMap);
        })
        .catch( error => dispatch(fecthCollectionsFailure(error)));

    }
}

