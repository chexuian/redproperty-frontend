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
import { SubscriptionPlanFeatureDto } from '../subscription-plans/subscription-plans';

@Injectable({ providedIn: 'root' })
export class SubscriptionService {
  constructor(private httpClient: HttpClient) {}

  getAllSubscriptionPlans() {
        return this.httpClient.get<PaginatedResponse<SubscriptionPlanFeatureDto>>('http://localhost:8081/rest/api/v1/subscription-plans');
  }
}
