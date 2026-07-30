import { useAuth as useAuthContext } from '../context/AuthContext';

/**
 * Custom hook providing access to global AuthContext state and functions
 */
export const useAuth = () => {
  return useAuthContext();
};

export default useAuth;
