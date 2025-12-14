import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '../services/property.service';
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
import { Property } from '../models/property.model';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-property-detail',
  imports: [
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
    DecimalPipe,
    CommonModule,
  ],
  templateUrl: './property-detail.html',
  styleUrl: './property-detail.css',
})
export class PropertyDetail implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private propertyService: PropertyService) {}
  property!: Property;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        // this.userName =
        //   this.usersService.users.find((u) => u.id === paramMap.get('userId'))?.name || '';
        console.log(paramMap.get('propertyId'));
        this.propertyService.getPropertyById(paramMap.get('propertyId')!).subscribe((res) => {
          this.property = res;
        });
      },
    });
  }
}
