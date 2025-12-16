import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AgencyDto,
  Amenity,
  Facility,
  FilterPropertyDto,
  PaginatedResponse,
  Property,
  PropertyCategory,
  Tag,
} from '../models/property.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private httpClient: HttpClient) {}

  createAgent(payload: Object) {
    let url = 'http://localhost:8081/rest/api/v1/users/create-agent'

    return this.httpClient.post(url, payload);
  }
}
