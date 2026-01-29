import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PropertyService } from '../../services/property';
import { Property } from '../../models/property.model';

@Component({
  selector: 'app-property-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './property-details.html',
  styleUrls: ['./property-details.css']
})
export class PropertyDetailsComponent implements OnInit {
  property: Property | undefined;
  loading: boolean = true;

  constructor(private route: ActivatedRoute, private propertyService: PropertyService) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.propertyService.getPropertyById(id).subscribe({
        next: (data: any) => {
          this.property = Array.isArray(data) ? data[0] : data;
          this.loading = false;
        },
        error: () => this.loading = false
      });
    }
  }
}