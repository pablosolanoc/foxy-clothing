import UserActionTypes from './user.types';

import { takeLatest, put, all, call, takeEvery } from "redux-saga/effects";

import {auth, googleProvider, createUserProfileDocument, getCurrentUser} from '../../firebase/firebase.utils';

import { signInSuccess, signInFailure, signOutFailure, signOutSuccess, signUpSuccess} from './user.actions';

export function* getSnapShotFromUserAuth(userAuth, additionalData){
    const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
    const userSnapShot = yield userRef.get();
    yield put(signInSuccess({
        id: userSnapShot.id,
        ...userSnapShot.data()
    }));
}

//My way of signUp then signIn
// export function* getSnapShotFromUserAuthWhenSignUp(userAuth, aditionalInfo){
//     const userRef = yield call(createUserProfileDocument, userAuth, aditionalInfo);
//     const userSnapShot = yield userRef.get();
//     yield put(signUpSuccess({
//         id: userSnapShot.id,
//         ...userSnapShot.data()
//     }));
// }

export function* signInWithGoogle(){
    try{
        const {user} = yield auth.signInWithPopup(googleProvider);
        yield getSnapShotFromUserAuth(user);
    }catch(error){
        yield put(signInFailure({error}));
    }
};

export function* signInWithEmail({payload: {email, password}}){
    try{
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapShotFromUserAuth(user);
    }catch(error){
         yield put(signInFailure(error))
    }
}

export function* isUserAuthenticated(){
    try{
        const userAuth = yield getCurrentUser();
        if(!userAuth) return;

        yield getSnapShotFromUserAuth(userAuth);
    }catch(error){
        yield put(signInFailure(error));
    }
    
}

export function* signOut(){
    try{
        yield auth.signOut();
        yield put(signOutSuccess());
    }catch(error){
        yield put(signOutFailure(error))
    }
}

//My way of signUp then signIn
// export function* signUpNewUser({payload: {displayName, email, password, confirmPassword}}){
//     try{
//         const {user} = yield auth.createUserWithEmailAndPassword(email, password);
//         yield getSnapShotFromUserAuthWhenSignUp(user, {displayName}); //after document is created we sign the user in
//     }catch(error){
//         yield put(signInFailure(error.message))
//     }
// }

export function* signUp({payload: {displayName, email, password, confirmPassword}}){
    try{
        const {user} = yield auth.createUserWithEmailAndPassword(email, password);
        yield put(signUpSuccess({user, additionalData: {displayName}}));
    }catch(error){
        yield put(signInFailure(error));
    }
}

export function* signInAfterSignUp({payload: {user, additionalData}}){
    yield getSnapShotFromUserAuth(user, additionalData);
}

export function* onGoogleSignInStart(){
    yield takeLatest(
        UserActionTypes.GOOGLE_SIGN_IN_START,
        signInWithGoogle
    );
}

export function* onEmailSignInStart(){
    yield takeLatest(
        UserActionTypes.EMAIL_SIGN_IN_START,
        signInWithEmail
    );
}

export function* onCheckUserSession(){
    yield takeEvery(
        UserActionTypes.CHECK_USER_SESSION,
        isUserAuthenticated
    );
}

export function* onSignOutStart(){
    yield takeLatest(
        UserActionTypes.SIGN_OUT_START,
        signOut
    )
}

export function* onSignUpStart(){
    yield takeLatest(
        UserActionTypes.SIGN_UP_START,
        // signUpNewUser
        signUp
    );
}

export function* onSignUpSuccess(){
    yield takeLatest(
        UserActionTypes.SIGN_UP_SUCCESS,
        //My way of signUp then signIn
        // signUpNewUser 
        signInAfterSignUp
    );
}

export function* userSagas(){
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ])
}