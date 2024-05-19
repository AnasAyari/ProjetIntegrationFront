import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/Classes/post';
import { AuthService } from 'src/app/Services/auth.service';
import { PostService } from 'src/app/Services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
  postForm!:FormGroup
  newPost :Post=new Post();
  private readonly USER_ID_KEY = 'USER_ID_KEY';
  
  constructor(
    private formBulder:FormBuilder,
    private authService:AuthService,
    private postService:PostService
  ){}
  ngOnInit(): void {
    this.postForm=this.formBulder.group({
      imageUrl:['', [Validators.required]],
      description:['', [Validators.required, Validators.maxLength(50)]],
    })
  }
  onSubmit(){
    if (this.postForm.valid){
      this.newPost=this.postForm.value;
      this.newPost.addedAt=new Date();
      this.newPost.likes=0;
      this.newPost.userId=Number(localStorage.getItem(this.USER_ID_KEY));
      console.log(this.newPost);
      this.postService.createPost(this.newPost).subscribe((data)=>{
        console.log('Post successfully added!', data);
        this.postForm.reset();
      })
    }
  }
}
