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
  joke = '';
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
      console.log('called with ', this.category);
      this.getRandomJoke();
    } else {
      console.log('called with ', this.category);
      this.getJokeByCategory(this.category.category);
    }
  }

  displayJoke() {
    var chars: string[] = [];

    for (let i = 0; i < this.joke.length; i++) {
      chars.push(this.joke[i]);
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
    this.isLoading = true;
    setTimeout(() => {
      this.characters = '';
      this.jokeService.getRandomJoke().subscribe((joke) => {
        this.isLoading = false;
        this.joke = joke.value;
        this.displayJoke();
      });
    }, 5000);
  }

  private getJokeByCategory(category: string) {
    this.isLoading = true;
    setTimeout(() => {
      this.characters = '';
      this.jokeService.getJokeByCategory(category).subscribe((joke) => {
        this.isLoading = false;
        this.joke = joke.value;
        this.displayJoke();
      });
    }, 5000);
  }
}
