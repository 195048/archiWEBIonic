import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  passwordForm: FormGroup;
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
    this.passwordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: this.checkPasswords });
  }

  ngOnInit(): void {
    const currentUserEmail = localStorage.getItem('email') || ""; // Placeholder
    this.userService.getUserById(currentUserEmail).subscribe(user => {
      this.user = user;
    });
  }

  onSubmit(): void {
    const oldPasswordControl = this.passwordForm.get('oldPassword');
    const newPasswordControl = this.passwordForm.get('newPassword');
    const confirmPasswordControl = this.passwordForm.get('confirmPassword');

    if (this.passwordForm.valid &&
        oldPasswordControl && newPasswordControl && confirmPasswordControl) {
      const oldPassword = oldPasswordControl.value;
      const newPassword = newPasswordControl.value;
      const confirmPassword = confirmPasswordControl.value;

      if (oldPassword !== this.user.password) {
        console.error('Old password is incorrect');
        return;
      }

      if (newPassword !== confirmPassword) {
        console.error('New passwords do not match');
        return;
      }

      this.user.password = newPassword;
      this.userService.updateUser(this.user).subscribe(
        () => {
          console.log('Password updated successfully');
          this.modalController.dismiss();
        },
        error => {
          console.error('Error updating password:', error);
        }
      );
    }
  }

  checkPasswords(group: FormGroup) {
    const passwordControl = group.get('newPassword');
    const confirmPasswordControl = group.get('confirmPassword');

    if (passwordControl && confirmPasswordControl) {
      const password = passwordControl.value;
      const confirmPassword = confirmPasswordControl.value;

      return password === confirmPassword ? null : { notSame: true };
    }
    return null;
  }

  onCancel(): void {
    this.modalController.dismiss();
  }
}
