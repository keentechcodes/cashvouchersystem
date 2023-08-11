import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(user ? {
            isAuthenticated: true,
            isLoading: false,
            user
          } : {
            isLoading: false
          })
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    if (!action.payload) {
      console.error("SIGN_IN action called without a payload.");
      return state;  // return unchanged state
    }

    const { id, username, fullname } = action.payload;
    console.log(`User signed in with id: ${id}, username: ${username}`);
  
    return {
      ...state,
      isAuthenticated: true,
      isLoading: false, // Explicitly setting isLoading to false
      user: {
        id,
        username,
        fullname
      }
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      isLoading: false, // Explicitly setting isLoading to false
      user: null
    };
  }
};

const reducer = (state, action) => {
  const newState = handlers[action.type] ? handlers[action.type](state, action) : state;
  console.log("Action:", action.type, "Old State:", state, "New State:", newState);
  return newState;
};


export const AuthContext = createContext(undefined);

const validateToken = async (token, dispatch) => {
  try {
    const response = await fetch('http://localhost:3003/validateToken', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const userData = await response.json();
      dispatch({
        type: HANDLERS.SIGN_IN,
        payload: {
          id: userData.id,
          username: userData.username,
          fullname: userData.fullname
        }
      });
    } else {
      window.localStorage.removeItem('authToken');
      dispatch({ type: HANDLERS.SIGN_OUT });
    }
  } catch (error) {
    console.error("Token validation error:", error);
    window.localStorage.removeItem('authToken');
    dispatch({ type: HANDLERS.SIGN_OUT });
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Moved initialize function out of useEffect
  const initialize = async () => {
    try {
      const authToken = window.localStorage.getItem('authToken');
      if (authToken) {
        await validateToken(authToken, dispatch);  // Changed the function call here
        return;
      }
      dispatch({ type: HANDLERS.INITIALIZE });
    } catch (error) {
      console.error("Initialization error:", error);
      dispatch({ type: HANDLERS.SIGN_OUT });
    }
  };

  useEffect(() => {
    console.log("Running initialization");
    initialize().then(() => {
      console.log("Initialization finished");
    });
  }, []);
  

  const signIn = async (username, password) => {
    try {
      const response = await fetch('http://localhost:3003/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
  
      const responseData = await response.json(); 
  
      if (response.ok && responseData.user) {
        const { token, user } = responseData;
        window.localStorage.setItem('authToken', token);
        dispatch({
          type: HANDLERS.SIGN_IN,
          payload: user
        });
        return true;
      } else {
        console.error('Login failed.');
        return false;
      }
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  };
  

  const signOut = () => {
    window.localStorage.removeItem('authToken');
    dispatch({ type: HANDLERS.SIGN_OUT });
  };

  return (
    <AuthContext.Provider value={{ ...state, signIn, signOut, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
