import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/interfaces/category';
import { JokeService } from 'src/app/services/joke/joke.service';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss'],
})
export class LegendComponent implements OnDestroy {
  progress = 0;
  characters = '';
  jokeValue = '';
  isLoading = false;
  jokeService = inject(JokeService);
  category!: Category;
  private category$;

  constructor() {
    this.category$ = this.jokeService.currentCategory$.subscribe((c) => {
      this.category = c;
      this.loadJoke();
    });
  }

  ngOnDestroy(): void {
    this.category$.unsubscribe();
  }

  loadJoke() {
    if (this.category.category.toLocaleLowerCase() == 'random') {
      this.getRandomJoke();
    } else {
      this.getJokeByCategory(this.category.category);
    }
  }

  displayJoke() {
    var chars: string[] = [];

    for (let i = 0; i < this.jokeValue.length; i++) {
      chars.push(this.jokeValue[i]);
    }

    var position = 0;
    var counter = setInterval(() => {
      if (position != chars.length) {
        this.characters += chars[position];
        this.progress = Math.floor(
          (this.characters.length / chars.length) * 100
        );
        position++;
      } else {
        clearInterval(counter);
      }
    }, 100);
  }

  private getRandomJoke() {
    this.progress = 0;
    this.characters = '';
    this.isLoading = true;
    setTimeout(() => {
      this.characters = '';
      this.jokeService.getRandomJoke().subscribe((joke) => {
        this.jokeValue = joke.value;
        this.displayJoke();
        this.isLoading = false;
      });
    }, 5000);
  }

  private getJokeByCategory(category: string) {
    this.progress = 0;
    this.characters = '';
    this.isLoading = true;
    setTimeout(() => {
      this.characters = '';
      this.jokeService.getJokeByCategory(category).subscribe((joke) => {
        this.jokeValue = joke.value;
        this.displayJoke();
        this.isLoading = false;
      });
    }, 5000);
  }
}
