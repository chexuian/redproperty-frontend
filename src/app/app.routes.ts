import { Routes } from '@angular/router';
import { PropertyList } from './property-list/property-list';
import { PropertyDetail } from './property-detail/property-detail';
import { CreateProperty } from './create-property/create-property';
import { SubscriptionPlans } from './subscription-plans/subscription-plans';

export const routes: Routes = [
  {
    path: '', //http://localhost:4200 OR http://localhost:4200/
    component: PropertyList,
    title: 'Property List',
  },
  {
    path: 'property/create-property', //<domain>/users/{uid}
    component: CreateProperty,
    title: 'Property Detail',
  },
  {
    path: 'property/:propertyId', //<domain>/users/{uid}
    component: PropertyDetail,
    title: 'Property Detail',
  },
  {
    path: 'subscription-plans', //<domain>/users/{uid}
    component: SubscriptionPlans,
    title: 'Subscription Plans',
  },
];
