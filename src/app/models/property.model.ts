// ----------------- AGENT / USER / AGENCY -----------------
export interface AgencyDto {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  contact_no: string;
}

export interface AgentDto {
  id: string;
  name: string;
  email: string;
  contact_no: string;
  password?: string | null;
  profile_pic?: string | null;
  agency: AgencyDto;
  license_number: string;
  bio?: string;
  verified: boolean;
}

// ----------------- PROPERTY CONTENT -----------------
export interface PropertyCategory {
  id: string;
  name: string;
  description?: string;
}

export interface PropertyType {
  id: string;
  name: string;
  description?: string;
}

export interface PropertyImage {
  id: string;
  image_url: string;
  image_order: number;
}

export interface Amenity {
  id: string;
  name: string;
  description?: string;
}

export interface Facility {
  id: string;
  name: string;
  description?: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  order_no: number;
}

export interface Property {
  id: string;
  name: string;
  description: string;
  category: PropertyCategory;
  type: PropertyType;
  address: string;
  city: string;
  state: string;
  country: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  carparks: number;
  built_year: string;
  floor_level: string;
  area_sqft: number;
  listing_type: string;
  status: string;
  agent: AgentDto;
  images: PropertyImage[];
  amenities: Amenity[];
  facilities: Facility[];
  tags: Tag[];
  faqs: FAQ[];
}

// ----------------- PAGINATION -----------------
export interface Pageable {
  page_number: number;
  page_size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface PaginatedResponse<T> {
  content: T[];
  pageable: Pageable;
  last: boolean;
  total_pages: number;
  total_elements: number;
  first: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  number_of_elements: number;
  empty: boolean;
}
