import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PostsService } from '../posts.service';

@Component ({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {

  constructor(public objectService: PostsService) {}

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
      this.objectService.addPost(form.value.title, form.value.content);
      form.resetForm();
      form.value.title = '';
      form.value.content = '';
    }
  }
}
