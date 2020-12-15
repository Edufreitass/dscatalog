import jwtDecode from 'jwt-decode';

export const CLIENT_ID = 'dscatalog';
export const CLIENT_SECRET = 'dscatalog123';

type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  userFirstName: string;
  userId: number;
}

type Role = 'ROLE_OPERATOR' | 'ROLE_ADMIN';

type AccessToken = {
  exp: number;
  user_name: string;
  authorities: Role[];
}

export const saveSessionData = (loginResponse: LoginResponse) => {
  localStorage.setItem('authData', JSON.stringify(loginResponse));
}

export const getSessionData = () => {
  const sessionData = localStorage.getItem('authData') ?? '{}';
  const parsedSessionData = JSON.parse(sessionData);

  return parsedSessionData as LoginResponse;
}

export const getAccessTokenDecoded = () => {
  const sessionData = getSessionData();

  const tokenDecoded = jwtDecode(sessionData.access_token);
  return tokenDecoded as AccessToken;
}

export const isTokenValid = () => {
  const { exp } = getAccessTokenDecoded();

  if (Date.now() <= exp * 1000) {
    return true;
  }

  return false;
}

// "authData" no localStorage
// access_token não pode estar expirado
export const isAuthenticated = () => {
  const sessionData = getSessionData();

  return sessionData.access_token && isTokenValid();
}