import { Routes } from '@angular/router';
import { PropertyList } from './property-list/property-list';
import { PropertyDetail } from './property-detail/property-detail';
import { CreateProperty } from './create-property/create-property';
import { SubscriptionPlans } from './subscription-plans/subscription-plans';
import { ManageProperty } from './manage-property/manage-property';
import { SignUpAgent } from './sign-up-agent/sign-up-agent';

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
    path: 'property/edit-property/:propertyId', //<domain>/users/{uid}
    component: ManageProperty,
    title: 'Manage Property Detail',
  },
  {
    path: 'subscription-plans', //<domain>/users/{uid}
    component: SubscriptionPlans,
    title: 'Subscription Plans',
  },
  {
    path: 'sign-up/agent', //<domain>/users/{uid}
    component: SignUpAgent,
    title: 'Signing Up As An Agent',
  },
];
