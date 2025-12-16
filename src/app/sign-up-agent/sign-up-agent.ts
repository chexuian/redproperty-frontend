import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AgencyService } from '../services/agency.service';
import { SubscriptionService } from '../services/subscription.service';
import { AgencyDto, PaginatedResponse } from '../models/property.model';
import { SubscriptionPlanFeatureDto, SubscriptionPlanViewModel } from '../subscription-plans/subscription-plans';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';


interface AgentSignUpForm {
  name: [string, ValidatorFn[]]; 
  email: [string, ValidatorFn[]];
  contact_no: [string, ValidatorFn[]];
  password: [string, ValidatorFn[]];
  confirmPassword: [string, ValidatorFn[]];
  profile_pic: [string];
  license_number: [string, ValidatorFn[]];
  bio: [string, ValidatorFn[]];
  agencyId: [string, ValidatorFn[]];
  subscriptionId: [string, ValidatorFn[]];
  termsAccepted: [boolean, ValidatorFn]; // Note: Validators.requiredTrue returns a single ValidatorFn
}

@Component({
  selector: 'app-sign-up-agent',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up-agent.html',
  styleUrl: './sign-up-agent.css',
})
export class SignUpAgent implements OnInit{// 2. Use specific types for clarity and safety
  agentForm!: FormGroup;
  agencyOptions: AgencyDto[] = [];
  subscriptionPlans: SubscriptionPlanViewModel[] = [];
  
  // Custom validator for password confirmation
  private passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  constructor(
    private fb: FormBuilder,
    private agencyService: AgencyService,
    private subService: SubscriptionService,
    private userService:UserService
  ) {}

  ngOnInit(): void {
    // 1. Initialize Form Structure
    this.agentForm = this.fb.group<AgentSignUpForm>({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contact_no: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]], // Local control for validation
      profile_pic: [''], // Placeholder for file data or URL
      license_number: ['', [Validators.required]],
      bio: ['', [Validators.required, Validators.maxLength(300)]],
      agencyId: ['', [Validators.required]], // Maps to agent.agency.id
      subscriptionId: ['', [Validators.required]], // Maps to subscription_plan.id
      termsAccepted: [false, Validators.requiredTrue]
    }, { 
    // Define the validator function inline using a lambda/arrow function
    validators: (form: AbstractControl) => { 
        // Cast the abstract control back to a FormGroup inside the function
        const formGroup = form as FormGroup;

        return formGroup.get('password')?.value === formGroup.get('confirmPassword')?.value
            ? null : { mismatch: true };
    }
});
    
    // 2. Load supporting data
    this.loadAgencies();
    this.loadSubscriptionPlans();
  }

  loadAgencies() {
    // 3. CORRECTED: Access the 'content' array from PaginatedResponse
    this.agencyService.getAllAgencies().subscribe({
      next: (response: PaginatedResponse<AgencyDto>) => {
        console.log("agncies:")
        console.log(response.content)
        this.agencyOptions = response.content;
      },
      error: (err) => {
        console.error('Error loading agencies:', err);
        // Implement user-friendly error handling here
      }
    });
  }

  loadSubscriptionPlans() {
    // 4. CORRECTED: Use the right service method and implement mapping
    this.subService.getAllSubscriptionPlans().pipe(
      // The API returns SubscriptionPlanFeatureDto; we need to transform this into the view model structure
      map((response: PaginatedResponse<SubscriptionPlanFeatureDto>) => this.transformPlans(response.content))
    ).subscribe({
      next: (plans: SubscriptionPlanViewModel[]) => {
        this.subscriptionPlans = plans;
        // Optionally pre-select the first plan
        if (plans.length > 0) {
          this.agentForm.get('subscriptionId')?.setValue(plans[2].id);
        }
      },
      error: (err) => {
        console.error('Error loading subscription plans:', err);
        // Implement user-friendly error handling here
      }
    });
  }

  /**
   * Helper function to map flat SubscriptionPlanFeatureDto into grouped ViewModel.
   * This is a critical step for organizing UI data.
   */
  private transformPlans(features: SubscriptionPlanFeatureDto[]): SubscriptionPlanViewModel[] {
    const planMap = new Map<string, SubscriptionPlanViewModel>();

    features.forEach(item => {
      const planDto = item.subscription_plan_dto;
      const featureDto = item.subscription_feature_dto;

      if (!planMap.has(planDto.id)) {
        // Initialize the plan in the map
        planMap.set(planDto.id, {
          id: planDto.id,
          name: planDto.name,
          tier: planDto.tier,
          price: planDto.price,
          duration_days: planDto.duration_days,
          features: []
        });
      }

      // Add the feature to the corresponding plan
      planMap.get(planDto.id)?.features.push({
        name: featureDto.name,
        description: featureDto.description,
        limit: item.unlimited ? null : item.feature_limit,
        unlimited: item.unlimited
      });
    });

    // Convert the Map values back to an array
    return Array.from(planMap.values());
  }


  onSubmit() {
    if (this.agentForm.valid) {
      const formData = this.agentForm.value;
      
      // 5. Construct the exact payload format requested by the API
      // Note: If profile_pic is a file, you'll need to handle the file upload separately (e.g., using FormData)
      const payload = {
        agent: {
          name: formData.name,
          email: formData.email,
          contact_no: formData.contact_no,
          password: formData.password,
          profile_pic: formData.profile_pic, // Assuming this is a URL or placeholder after a separate upload
          license_number: formData.license_number,
          bio: formData.bio,
          verified: false, // Default value as per API spec
          agency: {
            id: formData.agencyId
          }
        },
        subscription_plan: {
          id: formData.subscriptionId
        }
      };
      
      console.log('API Payload:', payload);
      this.userService.createAgent(payload).subscribe();
      // TODO: Call API service to register the agent
      // this.authService.registerAgent(payload).subscribe(...)

    } else {
      // Mark all fields as touched to show validation errors
      this.agentForm.markAllAsTouched(); 
    }
  }
}
