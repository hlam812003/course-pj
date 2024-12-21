import Cookies from 'js-cookie';

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
}

interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

class AuthService {
  private baseUrl = 'http://localhost:3001';

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      const data = await response.json();
      
      // Store tokens in cookies
      Cookies.set('token', data.token, { 
        expires: 1,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
      });
      
      Cookies.set('refreshToken', data.refreshToken, { 
        expires: 7,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
      });

      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async getCurrentUser(): Promise<User | null> {
    if (typeof window === 'undefined') return null;
    
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    try {
      const user = JSON.parse(userStr);
      // Verify token is still valid
      const token = Cookies.get('token');
      if (!token) {
        this.logout();
        return null;
      }
      return user;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }

  logout() {
    Cookies.remove('token');
    Cookies.remove('refreshToken');
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  }

  isAuthenticated(): boolean {
    return !!Cookies.get('token');
  }

  getToken(): string | null {
    return Cookies.get('token') || null;
  }
}

export const authService = new AuthService(); 