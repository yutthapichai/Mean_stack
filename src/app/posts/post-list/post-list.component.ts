import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription} from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { PageEvent } from '@angular/material';
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
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  constructor(public objectService: PostsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.objectService.getPosts(this.postsPerPage, this.currentPage); // ส่งข้อมูลไปหา server เพื่อ fetch ค่าออกแล้วอัพเดทลง Subject
    this.postsSub = this.objectService.getPostUpdateListener() // ติดตามการอัพเดทข้อมูลของ subject
    .subscribe((postsData: { posts: Post[], postCount: number }) => { //  รับเอาข้อมูลจาก subject เพื่อนำมาสแดงผล
      this.isLoading = false;
      this.totalPosts = postsData.postCount;
      this.posts = postsData.posts;
    }); // subscripe คือการติดตามความเคลื่อนไหว ของ method สังเกตุการและเชื่อมการทำงาน observable(ส่งค่า) กับ observer(รับค่า)
  } // observable.subscripe(observer)

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.objectService.getPosts(this.postsPerPage, this.currentPage);
  }


  onDelete(postId: string) {
    this.isLoading = true;
    this.objectService.deletePost(postId)
    .subscribe(() => {
      this.objectService.getPosts(this.postsPerPage, this.currentPage);
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
