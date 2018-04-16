import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "@environments/environment";
import { Observable } from "rxjs";

@Injectable()
export class CredentialsService {
  private url = environment.apiUrl + "pub/credentials/";
  constructor(private http: HttpClient) {}

  public sendCredential(credential, service: string): Observable<any> {
    const credentialsUrl = this.url + service.toLowerCase();
    return this.http.post(credentialsUrl, credential);
  }
}
