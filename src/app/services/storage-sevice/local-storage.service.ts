import { Injectable } from '@angular/core';
import * as SecureLS from "secure-ls";
const ls = new SecureLS({ encodingType: "aes" });

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  save(key: string, data: any) {
    ls.set(key, data);
  }

  getValue(key: string) {
    return ls.get(key)
  }
}
