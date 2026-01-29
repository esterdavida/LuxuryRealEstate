import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropertyService } from '../../services/property';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './property-edit.html',
  styleUrls: ['./property-edit.css']
})
export class PropertyEditComponent implements OnInit {
  propertyForm!: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private propertyService: PropertyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.propertyForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required]],
      price: [null, [Validators.required, Validators.min(1)]],
      city: ['', [Validators.required]],
      statusId: [1, Validators.required], 
      categoryId: [1, Validators.required] 
    });
  }

  onSubmit() {
    if (this.propertyForm.valid) {
      this.isSubmitting = true;
     
      this.propertyService.createProperty(this.propertyForm.value).subscribe({
        next: () => {
          alert('הנכס נוסף בהצלחה!');
          this.router.navigate(['/']); 
        },
        error: (err) => {
          console.error(err);
          this.isSubmitting = false;
        }
      });
    }
  }
}
