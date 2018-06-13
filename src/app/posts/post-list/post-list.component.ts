import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription} from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';
@Component ({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
/*  posts = [
    { title: 'First Post', content: 'This is the step Programmer' },
    { title: 'Second Post', content: 'This is the step Programmer junuir' },
    { title: 'Third Post', content: 'This is the step Programmerz senuir' }
  ];
*/
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public objectService: PostsService) {}

  ngOnInit() {
    this.objectService.getPosts();
    this.postsSub = this.objectService.getPostUpdateListener()
    .subscribe((posts: Post[]) => {
      this.posts = posts;
    }); // subscripe คือการติดตามความเคลื่อนไหว ของ method สังเกตุการและเชื่อมการทำงาน observable(ส่งค่า) กับ observer(รับค่า)
  } // observable.subscripe(observer)

  onDelete(postId: string) {
    this.objectService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
