import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
// Comment out if the components don't exist yet
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ChangeAddressComponent } from '../change-address/change-address.component';

interface User {
  email: string;
  password: string; 
  address: string;
  picture: string;
}

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user: User = {
    email: '',
    password: '',
    address: '',
    picture: ''
  };

  constructor(private modalController: ModalController, private userService: UserService) { }

  ngOnInit(): void {
    const email: string = localStorage.getItem('email') || '';  // Handle potential null value
    if (email) {
      this.userService.getUserById(email).subscribe(user => this.user = user);
    }
  }

  // Comment out the modal functions if the components don't exist yet
  
  async openChangePasswordModal() {
    const modal = await this.modalController.create({
      component: ChangePasswordComponent
    });
    return await modal.present();
  }

  async openChangeAddressModal() {
    const modal = await this.modalController.create({
      component: ChangeAddressComponent
    });
    return await modal.present();
  }
  
}
