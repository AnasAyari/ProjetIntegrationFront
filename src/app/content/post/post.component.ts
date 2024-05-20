import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentService } from 'src/app/Services/comment.service';
import { Comment } from 'src/app/Classes/comment';
import { UserServiceService } from 'src/app/Services/user-service.service';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent {
  @Input() imageURL!: string;
  @Input() description!: string;
  @Input() username!: string;
  @Input() postId!: number;
  @Input() addedAt!: Date;
  @Input() profilePic!: string;

  commentForm!: FormGroup;
  newComment: Comment = new Comment();
  comments: any[] = [];
  user: any = {};
  private readonly USER_ID_KEY = 'user_id';

  constructor(
    private formBuilder: FormBuilder,
    private commentService: CommentService,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      content: ['', [Validators.required, Validators.maxLength(50)]],
    });
    this.getAllComments();
     this.userService
       .getUserById(Number(localStorage.getItem(this.USER_ID_KEY)))
       .subscribe((data) => {
         this.user = data;
         console.log(this.user);
       });
       console.log(this.postId);
       
  }

  getAllComments(): void {
    this.commentService.getCommentsByPostId(this.postId).subscribe((data) => {
      this.comments = data as Comment[];
    });
  }

  onSubmit(): void {
    if (this.commentForm.valid) {
      this.newComment = this.commentForm.value;
      this.newComment.postId = this.postId;
      this.newComment.userId = Number(localStorage.getItem(this.USER_ID_KEY));
      console.log(this.newComment);
      this.commentService
        .createComment(this.newComment)
        .subscribe((data: Comment) => {
          console.log('Comment successfully added!', data);
          this.newComment.id = data.id; // assuming the returned data contains the id of the new comment
          this.comments.push(this.newComment);
          this.commentForm.reset();
        });
    }
  }

  like = true;
  toggleLike() {
    this.like = !this.like;
    return this.like;
  }

  save = true;
  toggleSave() {
    this.save = !this.save;
    return this.save;
  }
}


