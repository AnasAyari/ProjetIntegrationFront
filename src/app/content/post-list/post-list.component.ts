import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/Classes/post';
import { AuthService } from 'src/app/Services/auth.service';
import { PostService } from 'src/app/Services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent {
  postForm!: FormGroup;
  newPost: Post = new Post();
  posts: any[] = [];
  private readonly USER_ID_KEY = 'user_id';

  constructor(
    private formBulder: FormBuilder,
    private authService: AuthService,
    private postService: PostService
  ) {}
  ngOnInit(): void {
    this.postForm = this.formBulder.group({
      imageURL: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(50)]],
    });
    this.getALLPosts();
  }

  getALLPosts(): void {
    this.postService.getAllPosts().subscribe((data) => {
      this.posts = data;
      console.log(this.posts);
    });
  }
  onSubmit() {
    if (this.postForm.valid) {
      this.newPost = this.postForm.value;
      this.newPost.imageURL = this.newPost.imageURL.replace(
        'C:\\fakepath\\',
        ''
      );
      this.newPost.added_at = new Date();
      this.newPost.likes = 0;
      this.newPost.userId = Number(localStorage.getItem(this.USER_ID_KEY));
      console.log(this.newPost);
      this.postService.createPost(this.newPost).subscribe((data: Post) => {
        console.log('Post successfully added!', data);
        this.newPost.id = data.id; // assuming the returned data contains the id of the new post
        this.posts.unshift(this.newPost); // add the new post to the start of the posts array
        this.postForm.reset();
      });
    }
  }
  previewSrc: string = 'assets/imgs/animus tekken.png';

  previewFile(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.previewSrc = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      this.previewSrc = 'path_to_default_picture';
    }
  }
}
