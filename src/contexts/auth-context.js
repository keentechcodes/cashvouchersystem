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
      ...(
        // if payload (user) is provided, then is authenticated
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const { id, username } = action.payload;
    console.log(`User signed in with id: ${id}, username: ${username}`);

    return {
      ...state,
      isAuthenticated: true,
      user: {
        id,
        username
      }
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }
  
    initialized.current = true;
  
    let isAuthenticated = false;
  
    try {
      isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
    } catch (err) {
      console.error(err);
    }
  
    if (isAuthenticated) {
      // User is authenticated, fetch user data from the server based on the stored credentials
      try {
        const response = await fetch('http://localhost:3003/getUserData', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
  
        const userData = await response.json();
  
        // Check if the fetched user data is not empty
        if (userData.id && userData.avatar && userData.username) {
          dispatch({
            type: HANDLERS.SIGN_IN,
            payload: {
              id: userData.id,
              avatar: userData.avatar,
              username: userData.username
            }
          });
        } else {
          // User data is missing or invalid, treat as not authenticated
          isAuthenticated = false;
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        isAuthenticated = false;
      }
    }
  
    // If not authenticated or error occurred while fetching data, initialize with default state
    if (!isAuthenticated) {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const signIn = async (username, password) => {
    try {
      // Fetch user data from the table using username and password
      const response = await fetch('http://localhost:3003/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to authenticate');
      }
  
      const data = await response.json();
  
      console.log('Data received from backend:', data); // Add this log
  
      if (data.isAuthenticated) {
        // User credentials are valid, set isAuthenticated to true
        window.sessionStorage.setItem('authenticated', 'true');
  
        dispatch({
          type: HANDLERS.SIGN_IN,
          payload: {
            id: data.id,
            username: data.username,
            fullname: data.fullname
          }
        });
  
        return data; // Return the data received from the backend
      } else {
        // User credentials are invalid
        throw new Error('Please check your username and password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };
  
  const signUp = async (email, name, password) => {
    throw new Error('Sign up is not implemented');
  };

  const signOut = () => {
    // Clear the user data from sessionStorage
    try {
      window.sessionStorage.removeItem('authenticated');
    } catch (err) {
      console.error(err);
    }

    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, signIn, signUp, signOut, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
