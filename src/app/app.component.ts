import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from './services/auth.service';  // Adjust the path to where your AuthService is located

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  constructor(
    private menuCtrl: MenuController,
    private router: Router,
    private authService: AuthService  // Inject AuthService
  ) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/login' || event.url === '/register') {
          this.menuCtrl.enable(false);
        } else {
          this.menuCtrl.enable(true);
        }
      }
    });
  }

  logout() {
    this.authService.logout();  // Call the logout method from AuthService
    localStorage.clear();
    
    console.log('Logging out...');

    // Navigate to the login page
    this.router.navigate(['/login']);
  }
}
