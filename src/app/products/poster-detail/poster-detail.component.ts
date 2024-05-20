import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Poster } from 'src/app/Classes/poster';
import { PosterService } from 'src/app/Services/poster.service';

@Component({
  selector: 'app-poster-detail',
  templateUrl: './poster-detail.component.html',
  styleUrls: ['./poster-detail.component.css'],
})
export class PosterDetailComponent {
  poster!: Poster;
  
  constructor(
    private route: ActivatedRoute,
    private posterService: PosterService,
    private router:Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id);
    
    this.posterService.getPosterById(id).subscribe((poster) => {
      this.poster = poster;
      console.log(this.poster);
      
    });
  }
  NavigateBack(){
    this.router.navigate(['home/products']);
  }
}
