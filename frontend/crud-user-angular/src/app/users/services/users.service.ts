import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../model/user';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    private readonly API = 'http://localhost:8001/users';


    constructor(private httpClient: HttpClient) {

    }

    listAllUsers(): Observable<User[]> {
        return this.httpClient.get<User[]>(this.API);
    }

    getUserById(id: string): Observable<User> {
        return this.httpClient.get<User>(`${this.API}/${id}`);
    }

    addUser(user: User): Observable<User> {
        return this.httpClient.post<User>(this.API, user);
    }

    updateUser(id: string, user: User): Observable<User> {
        return this.httpClient.put<User>(`${this.API}/${id}`, user);
    }

    deleteUser(id: string): Observable<void> {
        return this.httpClient.delete<void>(`${this.API}/${id}`);
    }

    deleteListOfUsers(idList: Object[]): Observable<void> {
        return this.httpClient.request<void>('DELETE', `${this.API}/delete`, {body: {idList}});
    }
}
