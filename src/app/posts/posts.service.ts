import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})


export class PostsService {
  private posts: Post[] = []; // Post = [ {title:string,content:string} ] = [] เท่ากับค่าว่าง
  private postsUpdated = new Subject<Post[]>();
  getPosts() {
    return [...this.posts]; // แสดงค่า object {title:string,content:string}
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable(); // สังเกตุการอัพเดทข้อมูล
  }

  addPost(title: string, content: string) {
    const post: Post = {title: title, content: content};
    this.posts.push(post); // posts = [{title: title, content: content}]
    this.postsUpdated.next([...this.posts]); //  next เพื่อดึงค่าที่เราสนใจออกมา
  }
}
