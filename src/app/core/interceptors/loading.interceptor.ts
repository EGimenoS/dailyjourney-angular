import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UiService } from '../services/ui.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private uiService: UiService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.includes('search_address')) {
      return next.handle(request);
    }
    this.uiService.setLoading(true, request.url);
    return next.handle(request).pipe(
      catchError((err) => {
        this.uiService.setLoading(false, request.url);
        return err;
      }),
      tap((evt: HttpEvent<any>) => {
        if (evt instanceof HttpResponse) {
          this.uiService.setLoading(false, request.url);
        }
        return evt;
      })
    );
  }
}
