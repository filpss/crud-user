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
    inputUsernameValue: string = '';
    filteredUsersArray: any[] = [];
    users: User[] = [];
    displayModal: boolean;
    userForm: FormGroup;
    editMode: boolean;
    selectedUser: User;
    selectedValues: any[] = [];

    constructor(private usersService: UsersService, private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.usersService.listAllUsers().subscribe(
            (data: User[]) => {
                this.users = data;
                this.filteredUsersArray = this.users;
            });
        this.userForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]]
        });
    }

    createUser() {
        if (this.userForm.valid) {
            this.usersService.addUser(this.userForm.value).subscribe(
                () => {
                    this.userForm.reset();
                    this.displayModal = false;
                    window.location.reload(true);
                },
                error => {
                    if(error.status === 400) {
                        confirm('Nome de usuário ou e-mail já cadastrados');
                    } else {
                        confirm('Erro ao cadastrar usuário: ' + error.message);
                    }
                }
            );
        }
    }

    filterUserByName() {
        this.filteredUsersArray = this.users.filter(users => users.username.toLowerCase().includes(this.inputUsernameValue.toLowerCase()));
    }

    editUser() {
        if (this.userForm.valid) {
            let formData = this.userForm.value;
            if (this.editMode && !formData.password) {
                delete formData.password;
            }
            this.usersService.updateUser(this.selectedUser.id, this.userForm.value).subscribe(
                () => {
                    this.displayModal = false;
                    this.userForm.reset();
                    window.location.reload();
                },
                error => {
                    if(error.status === 400) {
                        confirm('Nome de usuário já cadastrado');
                    } else {
                        confirm('Erro ao atualizar usuário: ' + error);
                    }
                }
            );
        }
    }

    deleteSelectedUsers() {
        if (confirm('Deseja mesmo excluir este usuário?')) {
            if (this.selectedValues != null && this.selectedValues) {
                this.usersService.deleteListOfUsers(this.selectedValues).subscribe(
                    () => {
                        window.location.reload(true);
                        this.usersService.listAllUsers();
                    },
                    error => {
                        confirm('Erro ao deletar lista de usuários' + error);
                    }
                )
            }
        }
    }

    deleteUser(id: string): void {
        if (confirm('Deseja mesmo excluir este usuário?')) {
            this.usersService.deleteUser(id).subscribe(
                () => {
                    window.location.reload(true);
                    this.usersService.listAllUsers();
                }, error => {
                    confirm('Erro ao deletar usuário: ' + error)
                });
        }
    }

    openEditModal(user: User) {
        this.editMode = true;
        this.selectedUser = user;
        this.userForm.setValue({
            username: user.username,
            password: '',
            email: user.email,
        });
        this.userForm.get('password').clearValidators();
        this.userForm.get('password').updateValueAndValidity();
        this.userForm.get('email').disable();
        this.displayModal = true;
    }

    closeModal() {
        this.displayModal = false;
        this.userForm.reset();
        this.userForm.enable();
        this.editMode = false;
    }

    showModalDialog() {
        this.userForm.get('password').setValidators(Validators.required);
        this.userForm.get('password').updateValueAndValidity();
        this.displayModal = true;
    }
}
