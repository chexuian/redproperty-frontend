import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { PropertyService } from '../services/property.service';
import { Amenity, Facility, FAQ, Property, PropertyImage, Tag } from '../models/property.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-property',
  imports: [ReactiveFormsModule],
  templateUrl: './manage-property.html',
  styleUrl: './manage-property.css',
})
export class ManageProperty implements OnInit{

  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private propertyService: PropertyService) {}
  amenitiesList?: Amenity[];
  facilityList?: Facility[];
  tagList?: Tag[];
  selectedProperty?: Property;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        // this.userName =
        //   this.usersService.users.find((u) => u.id === paramMap.get('userId'))?.name || '';
        console.log(paramMap.get('propertyId'));
        this.propertyService.getPropertyById(paramMap.get('propertyId')!).subscribe((res) => {
          this.selectedProperty = res;
          console.log(this.selectedProperty);
          this.populateForm(res);
        });
      },
    });

    this.propertyService.getAllAmenities().subscribe((res) => {
      this.amenitiesList = res.content;
    });
    this.propertyService.getAllFacilities().subscribe((res) => {
      this.facilityList = res.content;
    });
    this.propertyService.getAllTags().subscribe((res) => {
      this.tagList = res.content;
    });

    this.propertyForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required]],
      category: this.fb.group({
        id: ['fa80a06d-ed85-4c65-aa5b-20f4461f6feb', Validators.required], // Assuming a dropdown/select for category ID
      }),
      type: this.fb.group({
        id: ['900907be-9851-4efd-8819-5a76425cc25a', Validators.required], // Assuming a dropdown/select for type ID
      }),
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      bedrooms: ['', [Validators.required, Validators.min(1)]],
      bathrooms: ['', [Validators.required, Validators.min(1)]],
      carparks: ['', [Validators.required, Validators.min(0)]],
      built_year: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]], // 4-digit year
      floor_level: ['', Validators.required],
      area_sqft: ['', [Validators.required, Validators.min(1)]],
      listing_type: ['RENT', Validators.required], // RENT or SALE
      status: ['AVAILABLE', Validators.required], // AVAILABLE, PENDING, SOLD/RENTED
      agent: this.fb.group({
        id: ['d55c3970-df42-4aae-b637-4f64ea985136', Validators.required], // Assuming a dropdown/select for agent ID
      }),

      // --- Array Controls ---
      images: this.fb.array([]),
      amenities: this.fb.array([]), // 5 mock amenities selected
      facilities: this.fb.array([]), // 4 mock facilities selected
      tags: this.fb.array([]), // 3 mock tags selected
      faqs: this.fb.array([]),
    });
  }

  propertyForm!: FormGroup;

  // Mock data for dropdowns (replace with actual API calls if needed)
  mockCategoryData = [
    { id: 'fa80a06d-ed85-4c65-aa5b-20f4461f6feb', name: 'Residential' },
    {
      id: '2e4a7e24-aff8-455f-945b-30d23e2a98be',
      name: 'Commercial',
    },
    // ... other categories
  ];
  // property-form.component.ts

  mockTypeData = [
    // Residential types
    { id: '900907be-9851-4efd-8819-5a76425cc25a', name: 'Apartment' },
    { id: '61298eb1-d9e1-4f22-8ed1-87b7752ff0af', name: 'Condominium (Condo)' },
    { id: 'c1125131-5d70-41e2-82ef-f2195b37e040', name: 'Villa' },
    { id: 'aea78baf-9d4c-47a8-9d27-22a6ae1eb961', name: 'Townhouse' },
    { id: 'b7436fa6-8de3-4bcf-b81a-7ce957c404b5', name: 'House (Landed)' },

    // Commercial types
    { id: 'becbd4b5-e610-492f-9497-1dfc5b7b2f73', name: 'Office Space' },
    { id: '37c5c2cb-65a5-40bc-a278-0479d951c108', name: 'Shop Lot' },
    { id: 'a15e3e61-4d46-48ab-8e83-3fcab4985c82', name: 'Warehouse' },
    { id: '33ed0a47-e620-4147-b979-85f60cdc730c', name: 'Factory' },
    { id: '8fcd43a5-5293-4afd-98ce-0922d9ea6316', name: 'Retail Space' },
  ];

  mockAgentData = [
    { id: '09ce0870-2301-41c2-93c6-9974d1ef672f', name: 'David Lee' },
    { id: 'd55c3970-df42-4aae-b637-4f64ea985136', name: 'Sarah Tan' },
    // ... other agents
  ];

  // Initial data for images
  // private createImageFormGroups(): FormGroup[] {
  //   return [
  //     this.fb.group({
  //       image_url: [
  //         'https://example.com/images/ipoh_townhouse_1_exterior.jpg',
  //         [Validators.required, Validators.pattern('https?://.*')],
  //       ],
  //       image_order: [1, [Validators.required, Validators.min(1)]],
  //     }),
  //     this.fb.group({
  //       image_url: [
  //         'https://example.com/images/ipoh_townhouse_2_living.jpg',
  //         [Validators.required, Validators.pattern('https?://.*')],
  //       ],
  //       image_order: [2, [Validators.required, Validators.min(1)]],
  //     }),
  //     this.fb.group({
  //       image_url: [
  //         'https://example.com/images/ipoh_townhouse_3_room.jpg',
  //         [Validators.required, Validators.min(1)],
  //       ],
  //       image_order: [3, [Validators.required, Validators.min(1)]],
  //     }),
  //   ];
  // }

  // Initial data for FAQs
  // private createFaqFormGroups(): FormGroup[] {
  //   return [
  //     this.fb.group({
  //       question: ['Are utilities included in the monthly rent?', Validators.required],
  //       answer: [
  //         'No, utilities (electricity, water, Wi-Fi) are not included and are the responsibility of the tenant.',
  //         Validators.required,
  //       ],
  //       order_no: [1, [Validators.required, Validators.min(1)]],
  //     }),
  //     this.fb.group({
  //       question: ['Is the Townhouse part of a gated community?', Validators.required],
  //       answer: [
  //         'No, this is a unit within an open residential area, but it has individual house security features like an alarm system.',
  //         Validators.required,
  //       ],
  //       order_no: [2, [Validators.required, Validators.min(1)]],
  //     }),
  //     // ... more initial FAQs
  //   ];
  // }

  // Getters for FormArray controls
  get images(): FormArray {
    return this.propertyForm.get('images') as FormArray;
  }
  get amenities(): FormArray {
    return this.propertyForm.get('amenities') as FormArray;
  }
  get facilities(): FormArray {
    return this.propertyForm.get('facilities') as FormArray;
  }
  get tags(): FormArray {
    return this.propertyForm.get('tags') as FormArray;
  }
  get faqs(): FormArray {
    return this.propertyForm.get('faqs') as FormArray;
  }

  // Dynamic Add/Remove methods
  addImage(): void {
    this.images.push(
      this.fb.group({
        image_url: [
          'https://example.com/image.jpg',
          [Validators.required, Validators.pattern('https?://.*')],
        ],
        image_order: [this.images.length + 1, [Validators.required, Validators.min(1)]],
      })
    );
  }
  removeImage(index: number): void {
    this.images.removeAt(index);
    // Optional: Re-sort image_order after removal
  }

  addFaq(): void {
    this.faqs.push(
      this.fb.group({
        question: ['', Validators.required],
        answer: ['', Validators.required],
        order_no: [this.faqs.length + 1, [Validators.required, Validators.min(1)]],
      })
    );
  }
  removeFaq(index: number): void {
    this.faqs.removeAt(index);
    // Optional: Re-sort order_no after removal
  }

  // Submit handler
  onSubmit(): void {
    console.log(this.propertyForm);
    if (this.propertyForm.valid) {
      const propertyData = {
  id: this.selectedProperty?.id, // or any ID you already have
  ...this.propertyForm.value
};
      console.log('Final JSON Data:', JSON.stringify(propertyData, null, 2));
      this.propertyService.updateProperty(propertyData).subscribe();

      // --- HERE IS WHERE YOU WOULD SEND THE DATA TO YOUR BACKEND ---
      // Example: this.backendService.createProperty(propertyData).subscribe(...)

      alert('Data Ready to Send. Check Console for JSON.');
    } else {
      // Mark all controls as touched to display validation errors
      this.markAllAsTouched(this.propertyForm);
      alert('Form is invalid. Please check the required fields.');
    }
  }

  private markAllAsTouched(control: AbstractControl): void {
    if (control instanceof FormGroup || control instanceof FormArray) {
      Object.values(control.controls).forEach((c) => this.markAllAsTouched(c));
    } else {
      control.markAsTouched();
    }
  }

  isAmenitySelected(amenityId: string): boolean {
    // Cast 'amenities.value' to 'any[]' to satisfy TypeScript without complicating the template.
    // We check if any object 'a' in the FormArray value has an 'id' matching amenityId.
    const selectedAmenities = this.amenities.value as { id: string }[];
    return selectedAmenities.some((a) => a.id === amenityId);
  }

  onAmenityChange(event: Event, amenityId: string): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      // Add the new amenity ID group to the FormArray
      this.amenities.push(this.fb.group({ id: [amenityId, Validators.required] }));
    } else {
      // Find the index of the amenity to remove
      const indexToRemove = this.amenities.controls.findIndex(
        (control) => control.value.id === amenityId
      );

      if (indexToRemove >= 0) {
        this.amenities.removeAt(indexToRemove);
      }
    }
  }

  isFacilitySelected(facilityId: string): boolean {
    const selectedFacilities = this.facilities.value as { id: string }[];
    return selectedFacilities.some((f) => f.id === facilityId);
  }

  onFacilityChange(event: Event, facilityId: string): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.facilities.push(this.fb.group({ id: [facilityId, Validators.required] }));
    } else {
      const indexToRemove = this.facilities.controls.findIndex(
        (control) => control.value.id === facilityId
      );
      if (indexToRemove >= 0) {
        this.facilities.removeAt(indexToRemove);
      }
    }
  }

  isTagSelected(tagId: string): boolean {
    const selectedTags = this.tags.value as { id: string }[];
    return selectedTags.some((t) => t.id === tagId);
  }

  onTagChange(event: Event, tagId: string): void {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.tags.push(this.fb.group({ id: [tagId, Validators.required] }));
    } else {
      const indexToRemove = this.tags.controls.findIndex((control) => control.value.id === tagId);
      if (indexToRemove >= 0) {
        this.tags.removeAt(indexToRemove);
      }
    }
  }

  private populateForm(property: Property): void {
  // Patch basic & nested fields
  this.propertyForm.patchValue({
    name: property.name,
    description: property.description,
    price: property.price,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    carparks: property.carparks,
    built_year: property.built_year,
    floor_level: property.floor_level,
    area_sqft: property.area_sqft,
    listing_type: property.listing_type,
    status: property.status,
    address: property.address,
    city: property.city,
    state: property.state,
    country: property.country,

    category: {
      id: property.category.id,
    },
    type: {
      id: property.type.id,
    },
    agent: {
      id: property.agent.id,
    },
  });

  // Populate FormArrays
  this.setImages(property.images);
  this.setAmenities(property.amenities);
  this.setFacilities(property.facilities);
  this.setTags(property.tags);
  this.setFaqs(property.faqs);
}

private setImages(images: PropertyImage[]): void {
  this.images.clear();

  images.forEach((img) => {
    this.images.push(
      this.fb.group({
        image_url: [img.image_url, [Validators.required, Validators.pattern('https?://.*')]],
        image_order: [img.image_order, [Validators.required, Validators.min(1)]],
      })
    );
  });
}

private setAmenities(amenities: Amenity[]): void {
  this.amenities.clear();

  amenities.forEach((a) => {
    this.amenities.push(this.fb.group({ id: [a.id, Validators.required] }));
  });
}

private setFacilities(facilities: Facility[]): void {
  this.facilities.clear();

  facilities.forEach((f) => {
    this.facilities.push(this.fb.group({ id: [f.id, Validators.required] }));
  });
}

private setTags(tags: Tag[]): void {
  this.tags.clear();

  tags.forEach((t) => {
    this.tags.push(this.fb.group({ id: [t.id, Validators.required] }));
  });
}

private setFaqs(faqs: FAQ[]): void {
  this.faqs.clear();

  faqs.forEach((faq) => {
    this.faqs.push(
      this.fb.group({
        question: [faq.question, Validators.required],
        answer: [faq.answer, Validators.required],
        order_no: [faq.order_no, [Validators.required, Validators.min(1)]],
      })
    );
  });
}

  onPropertyDelete(){
    this.propertyService.deletePropertyById(this.selectedProperty!.id).subscribe();
  }
}


