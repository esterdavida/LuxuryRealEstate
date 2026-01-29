import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PropertyService } from '../../services/property'; 
import { Property } from '../../models/property.model';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-property-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './property-list.html',
  styleUrls: ['./property-list.css']
})
export class PropertyListComponent implements OnInit {
  properties: Property[] = [];
  loading: boolean = true;
  private searchTerms = new Subject<any>();

  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.loadProperties();
    this.searchTerms.pipe(debounceTime(300), distinctUntilChanged()).subscribe(s => this.executeSearch(s));
  }

  loadProperties(): void {
    this.loading = true;
    this.propertyService.getProperties().subscribe({
      next: (data: any) => { this.properties = data; this.loading = false; },
      error: () => this.loading = false
    });
  }

  deleteProperty(id: number | undefined, event: Event): void {
    event.stopPropagation();
    if (!id || !confirm('למחוק לצמיתות?')) return;
    this.propertyService.deleteProperty(id).subscribe({
      next: () => this.properties = this.properties.filter(p => (p.Id || p.id) !== id)
    });
  }

  onSearch(text: string, min: string, max: string) {
    this.searchTerms.next({ text, min, max });
  }

  private executeSearch(searchObj: any) {
    this.propertyService.searchProperties(searchObj.text, searchObj.min, searchObj.max).subscribe((data: any) => {
      this.properties = data;
    });
  }
}