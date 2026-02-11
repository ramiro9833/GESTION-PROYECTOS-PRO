
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProjectService {
    private apiUrl = 'http://localhost:3000/projects';

    constructor(private http: HttpClient) {}

    getProjects(ownerId: string) {
        return this.http.get(`${this.apiUrl}/${ownerId}`);
    }

    createProject(project: any) {
        return this.http.post(this.apiUrl, project);
    }
}