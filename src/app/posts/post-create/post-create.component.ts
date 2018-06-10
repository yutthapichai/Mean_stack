import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../post.model';
@Component ({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  enteredTitle   = '';
  enteredContent = '';
  @Output() postCreated    = new EventEmitter<Post>();

  onAddPost(form: NgForm) {
    if ( form.value.title === '' || form.value.content === '' ) {
      if ( form.value.title === '' && form.value.content === '' ) {
        alert('please input Title and Content');
      } else if ( form.value.title === '' ) {
        alert('please input Title');
      } else if ( form.value.content === '' ) {
        alert('please input Content');
      }
    } else {
      const post: Post = {
        title:   form.value.title,
        content: form.value.content
      };
      this.postCreated.emit(post);
    }
  }
}
