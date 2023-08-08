import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-change-address',
  templateUrl: './change-address.component.html',
  styleUrls: ['./change-address.component.scss']
})
export class ChangeAddressComponent implements OnInit {
  addressForm: FormGroup;
  user: User = {
    email: '',
    password: '',
    address: '',
    picture: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private userService: UserService
  ) {
    this.addressForm = this.formBuilder.group({
      address: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const currentUserEmail = 'currentUserEmail@example.com'; // Placeholder
    this.userService.getUserById(currentUserEmail).subscribe(user => {
      this.user = user;
      this.addressForm.patchValue({
        address: user.address
      });
    });
  }

  onSubmit(): void {
    const addressControl = this.addressForm.get('address');
    if (this.addressForm.valid && addressControl) {
      const newAddress = addressControl.value;
      this.user.address = newAddress;

      const email = localStorage.getItem("email");
      if (email) {
        this.user.email = email;
      } else {
        console.error('Email not found in local storage');
        return;
      }

      this.userService.updateUser(this.user).subscribe(
        () => {
          console.log('Address updated successfully');
          this.modalController.dismiss();
        },
        error => {
          console.error('Error updating address:', error);
        }
      );
    }
}


  onCancel(): void {
    this.modalController.dismiss();
  }
}
