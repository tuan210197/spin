import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // debugger
    // Lấy token từ localStorage (hoặc sessionStorage)
    const token = localStorage.getItem('authToken');
    // Kiểm tra xem token có tồn tại không
    if (token) {
      // Clone lại request và thêm header Authorization
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    // Gửi request đi tiếp sau khi đã xử lý
    return next.handle(request);
  }
}
