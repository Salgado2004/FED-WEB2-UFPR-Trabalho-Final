import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

interface NavItem {
  name: string;
  route: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule], // Add CommonModule to imports array
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] // Corrected to styleUrls
})
export class NavbarComponent {
  navContainer = "flex flex-1 bg-primary-3 h-16 justify-end shadow-md";
  navItem = "flex h-full px-2 hover:bg-primary-4 cursor-pointer text-center align-middle items-center justify-center";
  navList = "flex justify-end gap-2 h-full";
  navDiv = "flex flex-1 items-center px-6 h-full justify-end";

  navItems: NavItem[] = [
    { name: 'Home', route: '/index' },
    { name: 'Login', route: '/login' },
    { name: 'Cadastro', route: '/cadastro' },
    { name: 'Customer', route: '/customer' },
    { name: 'Serviços', route: '/services' }
  ];

  shouldDisplay(item: NavItem): boolean {
    // Add your conditional logic here
    // For example, only display items with the route '/index' or '/login'
    return item.route === '/index' || item.route === '/login';
  }
}