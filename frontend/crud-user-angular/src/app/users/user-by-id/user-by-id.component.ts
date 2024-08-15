import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {UsersService} from '../services/users.service';
import {User} from '../model/user';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user-by-id',
  templateUrl: './user-by-id.component.html',
  styleUrls: ['./user-by-id.component.scss']
})
export class UserByIdComponent implements OnInit {
    user: User

  constructor(private userService: UsersService, private location: Location, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
      const userId = this.route.snapshot.paramMap.get('id');
      if (userId) {
          this.userService.getUserById(userId).subscribe(data => {
              this.user = data;
          });
      }
  }

  backToMainPage() {
      this.router.navigate(['/users']).then(() => {
          console.log('Navegação concluída');
      });
  }
}
