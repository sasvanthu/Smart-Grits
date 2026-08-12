import { useAuth } from '../contexts/AuthContext';

export const useFetchWithAuth = () => {
  const { token, logout } = useAuth();

  const fetchWithAuth = async (input: RequestInfo | URL, init?: RequestInit) => {
    const headers = new Headers(init?.headers);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    
    const response = await fetch(input, {
      ...init,
      headers
    });

    if (response.status === 401) {
      logout(); // Token might be expired or invalid
    }

    return response;
  };

  return fetchWithAuth;
};
