import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../contacts/contacts.service';

@Component({
  templateUrl: './edit-contact.component.html',
  standalone: true,
  styleUrls: ['./edit-contact.component.css'],
  imports: [ReactiveFormsModule],
  providers: [ContactsService]
})
export class EditContactComponent implements OnInit {
  contactForm = this.fb.nonNullable.group({
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: <Date | null>null,
    favoritesRanking: <number | null> null,

    phone: this.fb.nonNullable.group({
      phoneNumber: '',
      phoneType: '',
    }),

    address: this.fb.nonNullable.group({
      streetAddress: '',
      city: '',
      state: '',
      postalCode: '',
      addressType: ''
    })
  })

  constructor(private route: ActivatedRoute, 
    private contactsService: ContactsService,
     private router: Router,
     private fb: FormBuilder) {}

  ngOnInit() {
    console.log("on edit")
    const contactId = this.route.snapshot.params['id'];
    if (!contactId) return

    this.contactsService.getContact(contactId)
    .subscribe((contact) => {
      if(contact) {
        this.contactForm.setValue(contact);
      }
    })
  }

  saveContact() {
    this.contactsService.saveContact(this.contactForm.getRawValue()).subscribe({
      next: () => { 
        this.router.navigate(['/contacts'])
      }
    })
    
    console.log(this.contactForm.value);
  }
}
