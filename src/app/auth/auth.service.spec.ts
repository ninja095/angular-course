import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { TokenResponse } from './auth.interface';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let cookieService: CookieService;
  let router: Router;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CookieService,
        { provide: Router, useValue: routerSpy }
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    cookieService = TestBed.inject(CookieService);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save tokens', () => {
    const response: TokenResponse = { access_token: 'testAccessToken', refresh_token: 'testRefreshToken' };
    service.saveTokens(response);
    expect(service.token).toBe('testAccessToken');
    expect(service.refreshToken).toBe('testRefreshToken');
    expect(cookieService.get('token')).toBe('testAccessToken');
    expect(cookieService.get('refreshToken')).toBe('testRefreshToken');
  });

  it('should return isAuth as true if token exists', () => {
    service.token = 'testToken';
    expect(service.isAuth).toBeTrue();
  });

  it('should return isAuth as false if token does not exist', () => {
    service.token = null;
    expect(service.isAuth).toBeFalse();
  });

  it('should login and save tokens', () => {
    const response: TokenResponse = { access_token: 'testAccessToken', refresh_token: 'testRefreshToken' };
    service.login('testUser', 'testPassword').subscribe();
    const req = httpMock.expectOne(`${service.baseUrl}token`);
    expect(req.request.method).toBe('POST');
    req.flush(response);
    expect(service.token).toBe('testAccessToken');
    expect(service.refreshToken).toBe('testRefreshToken');
  });

  it('should refresh tokens', () => {
    const response: TokenResponse = { access_token: 'testAccessToken', refresh_token: 'testRefreshToken' };
    service.refreshToken = 'testRefreshToken';
    service.refreshTokens().subscribe();
    const req = httpMock.expectOne(`${service.baseUrl}refresh`);
    expect(req.request.method).toBe('POST');
    req.flush(response);
    expect(service.token).toBe('testAccessToken');
    expect(service.refreshToken).toBe('testRefreshToken');
  });

  it('should logout and clear tokens', () => {
    service.logout();
    expect(service.token).toBeNull();
    expect(service.refreshToken).toBeNull();
    expect(cookieService.get('token')).toBe('');
    expect(cookieService.get('refreshToken')).toBe('');
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
