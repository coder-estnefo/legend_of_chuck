import { Component, inject, Input } from '@angular/core';
import { CATEGORIES } from 'src/app/categories';
import { Category } from 'src/app/interfaces/category';
import { JokeService } from 'src/app/services/joke/joke.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  @Input({ required: true }) printProgress = 0;

  categories = CATEGORIES;
  jokeService = inject(JokeService);

  select(category: Category) {
    this.jokeService.setCurrentCategory(category);
  }
}
