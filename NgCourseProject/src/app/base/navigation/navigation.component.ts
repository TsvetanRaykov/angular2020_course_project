import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  get isLogged(): boolean {
    return false;
  }
  constructor() {}
  logout() {}
  ngOnInit() {}
}
