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
export class AgencyService {
  constructor(private httpClient: HttpClient) {}

  getAllAgencies() {
    let url = 'http://localhost:8081/rest/api/v1/agencies'

    return this.httpClient.get<PaginatedResponse<AgencyDto>>(url);
  }
}
