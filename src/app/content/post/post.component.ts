import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentService } from 'src/app/Services/comment.service';
import { Comment } from 'src/app/Classes/comment';
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

  commentForm!: FormGroup;
  newComment: Comment = new Comment();
  comments: any[] = [];
  private readonly USER_ID_KEY = 'user_id';

  constructor(
    private formBuilder: FormBuilder,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      content: ['', [Validators.required, Validators.maxLength(50)]],
    });
    this.getAllComments();
  }

  getAllComments(): void {
    this.commentService.getComments().subscribe((data) => {
      this.comments = data;
      console.log(this.comments);
    });
  }

  onSubmit(): void {
    if (this.commentForm.valid) {
      this.newComment = this.commentForm.value;
      this.newComment.postId = this.postId;
      this.newComment.userId = Number(localStorage.getItem(this.USER_ID_KEY));
      console.log(this.newComment);
      this.commentService.createComment(this.newComment).subscribe((data) => {
        console.log('Comment successfully added!', data);
        this.comments.push(data);
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


