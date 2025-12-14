import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaginatedResponse, Property } from '../models/property.model';

@Injectable({ providedIn: 'root' })
export class PropertyService {
  constructor(private httpClient: HttpClient) {}

  getAllProperties() {
    return this.httpClient.get<PaginatedResponse<Property>>(
      'http://localhost:8081/rest/api/v1/properties'
    );
  }
}
