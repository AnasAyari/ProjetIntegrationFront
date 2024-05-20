import { Component } from '@angular/core';
import { PosterService } from 'src/app/Services/poster.service';

@Component({
  selector: 'app-posters-sec',
  templateUrl: './posters-sec.component.html',
  styleUrls: ['./posters-sec.component.css'],
})
export class PostersSecComponent {
  posters: any[] = [];

  constructor(private posterService: PosterService) {}

  ngOnInit(): void {
    this.getAllPostes();
  }

  getAllPostes() {
    this.posterService.getAllPosters().subscribe((data) => {
      this.posters = data;
      console.log(this.posters);
    });
  }
}
