import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from 'firebase/auth';

import { auth } from '../../firebase/config';
import { authSlice } from './authReducer';

export const authSignUpUser = ({email, password, login}) => async (dispatch, getState) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        
        await updateProfile(auth.currentUser, {
            displayName: login,
        })

        const { uid, displayName } = auth.currentUser;

        dispatch(authSlice.actions.updateUserProfile({
            userId: uid,
            login: displayName,
        }))
        // console.log("user in Reg:", user)
    } catch (error) {
        if (error.message.includes('auth/email-already-in-use')) {
            alert('user already exists');
            return;
        }
        console.log('error:', error.message)
        alert(error.message)
    }
}

export const authSignInUser = ({email, password}) => async (dispatch, getState) => { 
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        console.log("user in log:", user)
    } catch (error) {
        if (error.message.includes('auth/user-not-found')) {
            alert('user not found');
            return;
        }
        if (error.message.includes('auth/invalid-email')) {
            alert('invalid emai');
            return;
        }
        console.log('error:', error.message)
        alert(error.message)
    }
}

export const authSignOutUser = () => async (dispatch, getState) => { 
    await signOut(auth);
    dispatch(authSlice.actions.authSignOut());
}
export const authStateChangeUser = () => async (dispatch, getState) => { }
