import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export type FuseApiReplyCallback =
    | ((data: { request: HttpRequest<any>; urlParams: { [key: string]: string } }) => ([number, string | any]) | Observable<any>)
    | undefined;

export type P4UApiMethods =
    | 'get'
    | 'post'
    | 'put'
    | 'patch'
    | 'delete';
