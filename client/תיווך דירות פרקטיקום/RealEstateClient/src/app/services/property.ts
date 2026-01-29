import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../models/property.model';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private apiUrl = 'https://localhost:7194/api/Exec';

  constructor(private http: HttpClient) { }

  
  getProperties(): Observable<Property[]> {
    return this.http.post<Property[]>(this.apiUrl, {
      spName: 'dbo.Properties_GetAll',
      params: {}
    });
  }
deleteProperty(id: number): Observable<any> {
  return this.http.post<any>(this.apiUrl, {
    spName: 'dbo.Properties_Delete', 
    params: { id: id }
  });}
  
  getPropertyById(id: number): Observable<Property> {
    return this.http.post<Property>(this.apiUrl, {
      spName: 'dbo.Properties_GetById',
      params: { id: id }
    });
  }


  searchProperties(searchText: string, minPrice?: number, maxPrice?: number): Observable<Property[]> {
    return this.http.post<Property[]>(this.apiUrl, {
      spName: 'dbo.Properties_Search',
      params: { 
        searchText: searchText || "", 
        minPrice: minPrice || 0, 
        maxPrice: maxPrice || 999999999 
      }
    });
  }


  createProperty(property: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, {
      spName: 'dbo.Properties_Create',
      params: property
    });
  }
}