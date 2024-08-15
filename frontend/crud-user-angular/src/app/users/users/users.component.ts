import {Component, OnInit} from '@angular/core';
import {UsersService} from '../services/users.service';
import {User} from '../model/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
    inputValue: string = '';
    filteredUsersArray: any[] = [];
    users: User[] = [];
    displayModal: boolean;
    userForm: FormGroup;

    constructor(private usersService: UsersService, private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.usersService.listAllUsers().subscribe((data: User[]) => {
            this.users = data;
            this.filteredUsersArray = this.users;
        });
        this.userForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]]
        });
    }

    onSubmit() {
        if(this.userForm.valid) {
            this.usersService.addUser(this.userForm.value).subscribe(
                response => {
                    console.log("Usuário adicionado", response);
                    this.userForm.reset();
                    this.displayModal = false;
                },
                error => {
                    console.error("Usuário não adicioado", error)
                }
            )
        }
    }

    filterUser() {
        this.filteredUsersArray = this.users.filter(users => users.username.toLowerCase().includes(this.inputValue.toLowerCase()));
    }

    showModalDialog() {
        this.displayModal = true;
    }

}
