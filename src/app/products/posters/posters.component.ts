import { Component } from '@angular/core';
import { PosterService } from 'src/app/Services/poster.service';

@Component({
  selector: 'app-posters',
  templateUrl: './posters.component.html',
  styleUrls: ['./posters.component.css'],
})
export class PostersComponent {
  posters: any[] = [];

  constructor(private posterService: PosterService) {}

  ngOnInit(): void {

    this.getAllUsers();

  }

  getAllUsers() {
    this.posterService.getAllPosters().subscribe((data) => {
      this.posters = data;
      console.log(this.posters);
    });
}

}