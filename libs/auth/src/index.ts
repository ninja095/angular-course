import { AuthService } from '@ac/data-access';
import { canActivateAuth } from './lib/auth';
import { authTokenInterceptor } from './lib/auth/auth.interceptor';

export {
  canActivateAuth,
  authTokenInterceptor,
  AuthService,
}
