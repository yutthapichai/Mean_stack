import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';

@Component ({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  public  post: Post;
  private mode = 'create';
  private postId: string;
  isLoading = false;



  constructor(public objectService: PostsService, public router: ActivatedRoute) {}

  ngOnInit() {
    this.router.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.objectService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {id: postData._id, title: postData.title, content: postData.content};
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onsavePost(form: NgForm) {
    if (form.invalid) {
      return;
    } else {
      this.isLoading = true;
      if (this.mode === 'create') {
        this.objectService.addPost(form.value.title, form.value.content);
        form.resetForm();
        form.value.title = '';
        form.value.content = '';
      } else {
        this.objectService.updatePost(this.postId, form.value.title, form.value.content);
      }
    }
  }
}
