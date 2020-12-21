import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UiService } from '../services/ui.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private uiService: UiService) {}
  excludedEndpoints = ['search_address', 'chat_messages', 'profile_travels'];
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('url:', request.url);
    if (this.excludedEndpoints.some((url) => request.url.includes(url))) {
      console.log('excluded');
      return next.handle(request);
    }
    console.log('included');
    this.uiService.setLoading(true, request.url);
    return next.handle(request).pipe(
      tap((evt: HttpEvent<any>) => {
        if (evt instanceof HttpResponse) {
          this.uiService.setLoading(false, request.url);
        }
        return evt;
      }),
      catchError((err) => {
        this.uiService.setLoading(false, request.url);
        return throwError(err);
      })
    );
  }
}
