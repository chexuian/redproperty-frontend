import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilterPropertyDto, PaginatedResponse, Property } from '../models/property.model';

@Injectable({ providedIn: 'root' })
export class PropertyService {
  constructor(private httpClient: HttpClient) {}

  getAllProperties(filterPropertyDto: FilterPropertyDto) {
    const fields: any = {};

    // Add city filter if city is provided
    if (filterPropertyDto.city) {
      fields.city = [{ op: 'like', value: filterPropertyDto.city }];
    }

    if (filterPropertyDto.propertyListingType) {
      fields.listingType = [{ op: 'like', value: filterPropertyDto.propertyListingType }];
    }

    let category = 'fa80a06d-ed85-4c65-aa5b-20f4461f6feb';
    if (filterPropertyDto.propertyCategory === 'COMMERCIAL') {
      category = '2e4a7e24-aff8-455f-945b-30d23e2a98be';
    }
    fields.category = [{ op: 'like', value: category }];

    let type = '';

    switch (filterPropertyDto.propertyType) {
      // Residential types
      case 'APARTMENT':
        type = '900907be-9851-4efd-8819-5a76425cc25a';
        break;
      case 'CONDO':
        type = '61298eb1-d9e1-4f22-8ed1-87b7752ff0af';
        break;
      case 'VILLA':
        type = 'c1125131-5d70-41e2-82ef-f2195b37e040';
        break;
      case 'TOWNHOUSE':
        type = 'aea78baf-9d4c-47a8-9d27-22a6ae1eb961';
        break;
      case 'HOUSE':
        type = 'b7436fa6-8de3-4bcf-b81a-7ce957c404b5';
        break;

      // Commercial types
      case 'OFFICE':
        type = 'becbd4b5-e610-492f-9497-1dfc5b7b2f73';
        break;
      case 'SHOP':
        type = '37c5c2cb-65a5-40bc-a278-0479d951c108';
        break;
      case 'WAREHOUSE':
        type = 'a15e3e61-4d46-48ab-8e83-3fcab4985c82';
        break;
      case 'FACTORY':
        type = '33ed0a47-e620-4147-b979-85f60cdc730c';
        break;
      case 'RETAIL_SPACE':
        type = '8fcd43a5-5293-4afd-98ce-0922d9ea6316';
        break;
    }
    fields.type = [{ op: 'like', value: type }];

    const filterObj = Object.keys(fields).length > 0 ? { fields } : null;
    let url = 'http://localhost:8081/rest/api/v1/properties';

    if (filterObj) {
      const encodedFilter = encodeURIComponent(JSON.stringify(filterObj));
      url += `?q=${encodedFilter}`;
    }

    return this.httpClient.get<PaginatedResponse<Property>>(url);
  }
}
