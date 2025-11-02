import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(
    private httpClient: HttpClient,
  ) { }

  postFileWithAuth(url: string, entity: any, type): Observable<any> {
   
    return Observable.create((observer: Observer<any>) => {
      this.httpClient.post(url, entity).subscribe(
        (response: any) => {
          
          observer.next(response);
        },
        (error: any) => {
          
          observer.error(error);
        }
      );
    });
  }

  putWithAuth(url: string, entity: any): Observable<any> {
   
    return Observable.create((observer: Observer<any>) => {
      this.httpClient.put(url, entity).subscribe(
        (response: any) => {
          
          observer.next(response);
        },
        (error: any) => {
          observer.error(error);
          
        }
      );
    });
  }

  patchWithAuth(url: string, entity: any): Observable<any> {   
    return Observable.create((observer: Observer<any>) => {
      this.httpClient.patch(url, entity).subscribe(
        (response: any) => {
          
          observer.next(response);
        },
        (error: any) => {
          observer.error(error);
          
        }
      );
    });
  }

  postWithAuth(url: string, entity: any): Observable<any> {   
    return Observable.create((observer: Observer<any>) => {
      this.httpClient.post(url, entity).subscribe(
        (response: any) => {
          observer.next(response);
        },
        (error: any) => {
          observer.error(error);          
        }
      );
    });
  }

  postWithAuthText(url: string, entity: any): Observable<any> {   
    return Observable.create((observer: Observer<any>) => {
      this.httpClient.post(url, entity,{responseType: 'text'}).subscribe(
        (response: any) => {
          observer.next(response);
        },
        (error: any) => {
          observer.error(error);          
        }
      );
    });
  }

  postWithoutAuth(url: string, entity: any): Observable<any> {
   
    return Observable.create((observer: Observer<any>) => {
      this.httpClient.post(url, entity).subscribe(
        (response: any) => {
          
          observer.next(response);
        },
        (error: any) => {
          
          observer.error(error);
        }
      );
    });
  }

  getWithAuth(url: string, showLoading = true): Observable<any> {
    try {
     
      return Observable.create((observer: Observer<any>) => {
        this.httpClient.get(url).subscribe(
          (response: any) => {
            // console.log("in getwithauth:",response)
            observer.next(response);
          },
          (error: any) => {
            
            observer.error(error);
          }
        );
      });
    } catch (error) {
    }
  }

  getWithAuthText(url: string, showLoading = true): Observable<any> {
    try {
     
      return Observable.create((observer: Observer<any>) => {
        this.httpClient.get(url,{responseType: 'text'}).subscribe(
          (response: any) => {
            // console.log("in getwithauth:",response)
            observer.next(response);
          },
          (error: any) => {
            
            observer.error(error);
          }
        );
      });
    } catch (error) {
    }
  }

  getWithoutAuth(url: string, showLoading = true): Observable<any> {
   
    return Observable.create((observer: Observer<any>) => {
      this.httpClient.get(url).subscribe(
        (response: any) => {
          
          observer.next(response);
        },
        (error: any) => {
          
          observer.error(error);
        }
      );
    });
  }



deleteWithAuth(url: string, entity: any): Observable<any> {  
  return Observable.create((observer: Observer<any>) => {
    this.httpClient.delete(url,entity).subscribe(
      (response: any) => {
        
        observer.next(response);
      },
      (error: any) => {
        observer.error(error);
        
      }
    );
  });
}
}
