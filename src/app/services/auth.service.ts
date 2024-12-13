import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';  // Thư viện giải mã JWT
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080'; // Replace with your API URL
  private tokenKey = 'authToken';



  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Promise<boolean> {
    debugger
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.http.post<any>(this.apiUrl+ '/user/login', { email, password }, { headers })
      .toPromise()
      .then(response => {
        console.log('Response from server:', response); // Log the response
        if (response && response.data.token) {
          console.log('Token received:', response.data.token); // Log the token
          this.saveToken(response.data.token)
          // window.location.reload();
          return true;
        }
        console.error('Token not found in response'); // Log if token not found
        return false;
      })
      .catch(err => {
        console.error('Login error', err); // Log the error
        return false;
      });
  }

  isLoggedIn(): boolean {
   
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      try {
        // Giải mã token để lấy thông tin 'exp'
        const decodedToken: any = jwtDecode(token);

        if (decodedToken && decodedToken.exp) {
          // 'exp' là thời gian hết hạn trong JWT (tính bằng giây)
          const expirationDate = decodedToken.exp * 1000; // Chuyển từ giây sang mili giây
          // console.log(expirationDate)
          const currentDate = new Date().getTime();
          // console.log(currentDate)
          // console.log(currentDate - expirationDate)
          // So sánh thời gian hết hạn với thời gian hiện tại
          return currentDate <= expirationDate;
        }
        return true; // Nếu không có trường 'exp' trong token, coi như token hết hạn
      } catch (error) {
        // Nếu có lỗi khi giải mã token (ví dụ token không hợp lệ), coi như token hết hạn
        console.error('Invalid token', error);
        return true;
      }
    } else {
      return false;
    }

  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  // Lưu token mới vào localStorage
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

    // Gọi API refreshToken
    refreshToken(): Observable<any> {
      const token = this.getToken();
      if (!token) {
        throw new Error('No token available for refresh');
      }
      // Gửi token hiện tại để refresh token mới
      return this.http.get<any>(this.apiUrl+ '/user/refreshToken');
    }



}
