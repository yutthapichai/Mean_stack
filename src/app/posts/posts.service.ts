import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


@Injectable({providedIn: 'root'})


export class PostsService {
  private posts: Post[] = []; // Post = [ {title:string,content:string} ] = [] เท่ากับค่าว่าง
  private postsUpdated = new Subject();


  constructor( private http: HttpClient ) {}


  getPosts() {
    // return [...this.posts]; // แสดงค่า object {title:string,content:string}
    this.http
    .get<{ message: string, posts: Post[] }>(
      'http://localhost:5000/api/gets'
    )
    .subscribe((postData) => {
      console.log(postData.posts);
      this.posts = postData.posts;
      this.postsUpdated.next([...this.posts]);
    });
  }


  getPostUpdateListener() {
    return this.postsUpdated.asObservable(); // สังเกตุการอัพเดทข้อมูล
  }


  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content};
    this.http.post<{message: string}>('http://localhost:5000/api/posts', post)
    .subscribe((responseData) => {
      console.log(responseData.message);
      this.posts.push(post); // posts = [{title: title, content: content}]
      this.postsUpdated.next([...this.posts]); //  next เพื่อดึงค่าที่เราสนใจออกมา
    });
  }
}
