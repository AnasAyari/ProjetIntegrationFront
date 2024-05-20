import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PosterService } from 'src/app/Services/poster.service';

@Component({
  selector: 'app-posters',
  templateUrl: './posters.component.html',
  styleUrls: ['./posters.component.css'],
})
export class PostersComponent {
  posters: any[] = [];

  constructor(private posterService: PosterService, private router:Router) {}

  ngOnInit(): void {
    this.getAllPosters();
  }

  getAllPosters() {
    this.posterService.getAllPosters().subscribe((data) => {
      this.posters = data;
      console.log(this.posters);
    });
  }

  goToDetails(id: number) {
    this.router.navigate(['home/poster-detail', id]);
  }
}