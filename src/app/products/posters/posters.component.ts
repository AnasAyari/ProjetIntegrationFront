import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PosterService } from 'src/app/Services/poster.service';

@Component({
  selector: 'app-posters',
  templateUrl: './posters.component.html',
  styleUrls: ['./posters.component.css'],
})
export class PostersComponent implements OnInit {
  posters: any[] = [];
  filteredPosters: any[] = [];

  constructor(private posterService: PosterService, private router: Router) {}

  ngOnInit(): void {
    this.loadPosters();
  }

  loadPosters() {
    this.posterService.getAllPosters().subscribe((posters) => {
      this.posters = posters;
      this.filteredPosters = posters; // Initialize filteredPosters with all posters
    });
  }

  onFilterChange(filter: any) {
    if (filter.artist) {
      this.posterService.getPosterByArtist(filter.artist).subscribe((posters) => {
        this.filteredPosters = posters.filter((poster) =>
          (!filter.album || poster.album.toLowerCase().includes(filter.album.toLowerCase()))
        );
      });
    } else {
      this.filteredPosters = this.posters.filter((poster) =>
        (!filter.album || poster.album.toLowerCase().includes(filter.album.toLowerCase()))
      );
    }
  }
  
  

  goToDetails(id: number) {
    this.router.navigate(['home/poster-detail', id]);
  }
}
