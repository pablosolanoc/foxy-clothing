import {takeEvery, call, put, takeLatest, all} from 'redux-saga/effects';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import {fecthCollectionsFailure, fecthCollectionsSuccess} from './shop.actions'

import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync(){
    try{
        const collectionRef = firestore.collection('collections');
        const snapShot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapShot);
        yield put(fecthCollectionsSuccess(collectionsMap));
    }catch(error){
        yield put(fecthCollectionsFailure(error.message));
    }
}

export function* fetchCollectionStart(){
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START, 
        fetchCollectionsAsync
    );
}

export function* shopSagas(){
    yield all([call(fetchCollectionStart)]);
}