import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ZardAvatarComponent } from '@shared/components/avatar/avatar.component';
import { ZardBreadcrumbModule } from '@shared/components/breadcrumb/breadcrumb.module';
import { ZardButtonComponent } from '@shared/components/button/button.component';
import { ZardDividerComponent } from '@shared/components/divider/divider.component';
import { ZardIconComponent } from '@shared/components/icon/icon.component';
import { ZardIcon } from '@shared/components/icon/icons';
import { ZardInputDirective } from '@shared/components/input/input.directive';
import { LayoutModule } from '@shared/components/layout/layout.module';
import { ZardMenuModule } from '@shared/components/menu/menu.module';
import { ZardRadioComponent } from '@shared/components/radio/radio.component';
import { ZardSegmentedComponent } from '@shared/components/segmented/segmented.component';
import { ZardSkeletonComponent } from '@shared/components/skeleton/skeleton.component';
import { ZardTooltipModule } from '@shared/components/tooltip/tooltip';
import { PropertyService } from './services/property.service';
import { PaginatedResponse, Property } from './models/property.model';

interface MenuItem {
  icon: ZardIcon;
  label: string;
  submenu?: { label: string }[];
}

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    LayoutModule,
    FormsModule,
    ZardButtonComponent,
    ZardBreadcrumbModule,
    ZardMenuModule,
    ZardSkeletonComponent,
    ZardTooltipModule,
    ZardDividerComponent,
    ZardAvatarComponent,
    ZardIconComponent,
    ZardInputDirective,
    ZardRadioComponent,
    ZardSegmentedComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  propertiesPaginated?: PaginatedResponse<Property>;
  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.propertyService.getAllProperties().subscribe((res) => {
      console.log(res);
      this.propertiesPaginated = res;
    });
  }
  // listing type
  listingTypeOptions = [
    { value: 'buy', label: 'Buy' },
    { value: 'rent', label: 'Rent' },
  ];
  onlistingTypeChange(value: string) {
    console.log('Selected:', value);
  }

  // property category
  propertyCategoryOptions = [
    { value: 'RESIDENTIAL', label: 'Residential' },
    { value: 'COMMERCIAL', label: 'Commercial' },
  ];
  selectedPropertyCategory = 'RESIDENTIAL';
  selectedPropertyType = 'APARTMENT';

  onPropertyCategoryChange(value: string) {
    this.selectedPropertyCategory = value;
    if (this.selectedPropertyCategory === 'RESIDENTIAL') {
      this.selectedPropertyType = 'APARTMENT';
    }
    if (this.selectedPropertyCategory === 'COMMERCIAL') {
      this.selectedPropertyType = 'OFFICE';
    }
  }

  // sidebar
  readonly sidebarCollapsed = signal(false);

  mainMenuItems: MenuItem[] = [
    { icon: 'house', label: 'Home' },
    { icon: 'inbox', label: 'Inbox' },
  ];

  workspaceMenuItems: MenuItem[] = [
    {
      icon: 'folder',
      label: 'Projects',
      submenu: [{ label: 'Design System' }, { label: 'Mobile App' }, { label: 'Website' }],
    },
    { icon: 'calendar', label: 'Calendar' },
    { icon: 'search', label: 'Search' },
  ];

  toggleSidebar() {
    this.sidebarCollapsed.update((collapsed) => !collapsed);
  }

  onCollapsedChange(collapsed: boolean) {
    this.sidebarCollapsed.set(collapsed);
  }
}
