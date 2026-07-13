import { USER_DATA } from '../constants/appConstants';
import supabase from '../utils/supabaseClient';

export function userInitState() {
  return { type: USER_DATA.INITSTATE };
}

export function userInit(data) {
  return {
    type: USER_DATA.INIT,
    payload: data
  };
}

export function user(data) {
  return {
    type: USER_DATA.START,
    payload: data,
  };
}

export function userFailure(data) {
  return {
    type: USER_DATA.REJECTED,
    payload: data,
  };
}

export function userSuccess(data) {
  return {
    type: USER_DATA.FULFILLED,
    payload: data,
  };
}

// Login actions
export function login(credentials) {
  return async (dispatch) => {
    dispatch({ type: USER_DATA.LOGIN_START });
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });
      
      if (error) {
        dispatch(loginFailure(error.message));
        return;
      }
      
      // Get user profile data if needed
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();
        
      const userData = {
        ...data.user,
        profile: profileData || {}
      };
      
      dispatch(loginSuccess(userData));
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };
}

export function loginSuccess(user) {
  return {
    type: USER_DATA.LOGIN_FULFILLED,
    payload: user,
  };
}

export function loginFailure(error) {
  return {
    type: USER_DATA.LOGIN_REJECTED,
    payload: error,
  };
}

// Register actions
export function register(userData) {
  return async (dispatch) => {
    dispatch({ type: USER_DATA.REGISTER_START });
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name,
          },
        },
      });
      
      if (error) {
        dispatch(registerFailure(error.message));
        return;
      }
      
      // Create a profile record
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              name: userData.name,
              email: userData.email,
            }
          ]);
          
        if (profileError) {
          console.error('Error creating profile:', profileError);
        }
      }
      
      dispatch(registerSuccess(data.user));
    } catch (error) {
      dispatch(registerFailure(error.message));
    }
  };
}

export function registerSuccess(user) {
  return {
    type: USER_DATA.REGISTER_FULFILLED,
    payload: user,
  };
}

export function registerFailure(error) {
  return {
    type: USER_DATA.REGISTER_REJECTED,
    payload: error,
  };
}

// Logout actions
export function logout() {
  return async (dispatch) => {
    dispatch({ type: USER_DATA.LOGOUT_START });
    
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        dispatch(logoutFailure(error.message));
        return;
      }
      
      dispatch(logoutSuccess());
    } catch (error) {
      dispatch(logoutFailure(error.message));
    }
  };
}

export function logoutSuccess() {
  return {
    type: USER_DATA.LOGOUT_FULFILLED,
  };
}

export function logoutFailure(error) {
  return {
    type: USER_DATA.LOGOUT_REJECTED,
    payload: error,
  };
}

export function clearError() {
  return {
    type: USER_DATA.CLEAR_ERROR,
  };
}

// Check current session
export function checkSession() {
  return async (dispatch) => {
    dispatch({ type: USER_DATA.START });
    
    try {
      const { data, error } = await supabase.auth.getSession();
      
      if (error || !data.session) {
        dispatch(userFailure(error?.message || 'No active session'));
        return;
      }
      
      // Get user profile data if needed
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.session.user.id)
        .single();
        
      const userData = {
        ...data.session.user,
        profile: profileData || {}
      };
      
      dispatch(userSuccess(userData));
    } catch (error) {
      dispatch(userFailure(error.message));
    }
  };
}