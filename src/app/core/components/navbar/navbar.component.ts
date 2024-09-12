import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { RouterModule } from '@angular/router';

interface NavItem {
  name: string;
  route: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] 
})
export class NavbarComponent {
  navContainer = "flex flex-1 bg-primary-3 h-16 justify-between shadow-md";
  navItem = "flex h-full px-2 hover:bg-primary-4 cursor-pointer text-center align-middle items-center justify-center";
  navList = "flex justify-end gap-2 h-full";
  navDiv = "flex flex-1 items-center px-6 h-full justify-between";
  navLogo = "px-4 text-3xl font-serif text-secondary-8"
  navUserText = "text-secondary-0";
  navData = "flex gap-4 align-middle justify-center items-center";

  navItems: NavItem[] = [
    { name: 'Home', route: '/index' },
    { name: 'Login', route: '/login' },
    { name: 'Cadastro', route: '/cadastro' },
    { name: 'Customer', route: '/customer' },
    { name: 'Serviços', route: '/services' }
  ];

  shouldDisplay(item: NavItem): boolean {

    return item.route === '/index' || item.route === '/login';
  }
}