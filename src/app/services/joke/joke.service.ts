import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CATEGORIES } from 'src/app/categories';
import { Category } from 'src/app/interfaces/category';
import { Joke } from 'src/app/interfaces/joke';

@Injectable({
  providedIn: 'root',
})
export class JokeService {
  private categorySubject: BehaviorSubject<Category> = new BehaviorSubject(
    CATEGORIES[0]
  );
  currentCategory$: Observable<Category>;

  private readonly baseUrl = 'https://api.chucknorris.io/jokes/random';

  constructor(private http: HttpClient) {
    this.currentCategory$ = this.categorySubject.asObservable();
  }

  setCurrentCategory(category: Category) {
    this.categorySubject.next(category);
  }

  getRandomJoke(): Observable<Joke> {
    return this.http.get<Joke>(this.baseUrl);
  }

  getJokeByCategory(category: string): Observable<Joke> {
    const url = new URL(this.baseUrl);
    url.searchParams.set('category', category);
    return this.http.get<Joke>(url.href);
  }
}
