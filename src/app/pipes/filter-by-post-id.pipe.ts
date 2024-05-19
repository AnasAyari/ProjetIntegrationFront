import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByPostId',
})
export class FilterByPostIdPipe implements PipeTransform {
  transform(comments: any[], postId: number): any[] {
    if (!comments || !postId) {
      return comments;
    }

    return comments.filter((comment) => comment.postId === postId);
  }
}
