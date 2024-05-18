import { Component } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  like=true
  toggleLike(){
    this.like=!this.like
    return this.like
  }

  save=true
  toggleSave(){
    this.save=!this.save
    return this.save
  }
}
