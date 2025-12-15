import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PaginatedResponse } from '../models/property.model';
import { DecimalPipe } from '@angular/common';

interface SubscriptionPlanDto {
    id: string;
    name: string; // e.g., "Premium Plan"
    tier: 'BASIC' | 'STANDARD' | 'PREMIUM'; // Use a union type for Tiers
    price: number;
    duration_days: number;
}

interface SubscriptionFeatureDto {
    id: string;
    code: string; // e.g., "AGENT_BADGE"
    name: string; // e.g., "Agent Badge"
    description: string;
}

interface SubscriptionPlanFeatureDto {
  id: string;
  subscription_plan_dto: SubscriptionPlanDto;
  subscription_feature_dto: SubscriptionFeatureDto;
  feature_limit: number;
  unlimited: boolean;
}

// Interfaces for the Output (View Model)
interface PlanFeature {
    name: string;
    description: string;
    limit: number | null;
    unlimited: boolean;
}

export interface SubscriptionPlanViewModel {
    id: string;
    name: string;
    tier: 'BASIC' | 'STANDARD' | 'PREMIUM';
    price: number;
    duration_days: number;
    features: PlanFeature[];
}

@Component({
  selector: 'app-subscription-plans',
  imports: [DecimalPipe],
  templateUrl: './subscription-plans.html',
  styleUrl: './subscription-plans.css',
})
export class SubscriptionPlans implements OnInit{
  // plans?: SubscriptionPlanFeatureDto[];
  plans: SubscriptionPlanViewModel[] = [];
  allUniqueFeatures: PlanFeature[] = [];

  constructor(private httpClient: HttpClient){}

  ngOnInit(): void {
    this.httpClient.get<PaginatedResponse<SubscriptionPlanFeatureDto>>('http://localhost:8081/rest/api/v1/subscription-plans').subscribe((res)=>{

      const transformedPlans = this.transformData(res.content);
            this.plans = transformedPlans;
            // NEW: Generate the master list of features
            this.allUniqueFeatures = this.generateUniqueFeaturesList(transformedPlans);
    })
  }

  private transformData(data: SubscriptionPlanFeatureDto[]): SubscriptionPlanViewModel[] {
    const plansMap = new Map<string, SubscriptionPlanViewModel>();

    data.forEach(item => {
      const planDto = item.subscription_plan_dto;
      const featureDto = item.subscription_feature_dto;
      const planId = planDto.id;

      // 1. Define the feature structure for the final output
      const feature: PlanFeature = {
        name: featureDto.name,
        description: featureDto.description,
        limit: item.feature_limit,
        unlimited: item.unlimited,
      };

      // 2. Check if the plan already exists in the Map
      if (!plansMap.has(planId)) {
        // If it doesn't exist, create the plan card structure
        plansMap.set(planId, {
          id: planId,
          name: planDto.name,
          tier: planDto.tier,
          price: planDto.price,
          duration_days: planDto.duration_days,
          features: [], // Initialize the feature array
        });
      }

      // 3. Push the feature to the feature list of the corresponding plan
      plansMap.get(planId)!.features.push(feature);
    });

    // Sort plans by Tier (e.g., Basic, Standard, Premium) for consistent column order
    const sortedPlans = Array.from(plansMap.values());
    return sortedPlans.sort((a, b) => {
      const order = { BASIC: 1, STANDARD: 2, PREMIUM: 3 };
      return order[a.tier] - order[b.tier];
    });
  }

  private generateUniqueFeaturesList(plans: SubscriptionPlanViewModel[]): PlanFeature[] {
    const uniqueFeaturesMap = new Map<string, PlanFeature>();

    plans.forEach(plan => {
      plan.features.forEach(feature => {
        // Use the feature name or code as the key for uniqueness
        if (!uniqueFeaturesMap.has(feature.name)) {
          uniqueFeaturesMap.set(feature.name, feature);
        }
      });
    });

    return Array.from(uniqueFeaturesMap.values());
  }

  planHasFeature(plan: SubscriptionPlanViewModel, featureName: string): PlanFeature | undefined {
    return plan.features.find(f => f.name === featureName);
  }

}
