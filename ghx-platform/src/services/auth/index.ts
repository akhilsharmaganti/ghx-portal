// Authentication Services Index
// Provides clean interface for all authentication services

export { 
  IAuthService, 
  IAuthConfigService 
} from './auth.interface';

export { AuthService } from './auth.service';
export { AuthConfigService } from './auth-config.service';

// Default instances for easy use
import { AuthService } from './auth.service';
import { AuthConfigService } from './auth-config.service';

// Create default instances
const authService = new AuthService();
const authConfigService = new AuthConfigService();

export { authService, authConfigService }; 