import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})


export class PostsService {
  private posts: Post[] = []; // Post = [ {title:string,content:string} ] = [] เท่ากับค่าว่าง
  private postsUpdated = new Subject();


  constructor( private http: HttpClient ) {}


  getPosts() {
    // return [...this.posts]; // แสดงค่า object {title:string,content:string}
    this.http
    .get<{ message: string, posts: any }>(
      'http://localhost:5000/api/gets'
    )
    .pipe(map((postData) => {
      return postData.posts.map(post => {
        return {
          id: post._id,
          title: post.title,
          content: post.content
        };
      });
    }))
    .subscribe((transformedpost) => {
      console.log(transformedpost);
      this.posts = transformedpost;
      this.postsUpdated.next([...this.posts]);
    });
  }


  getPostUpdateListener() {
    return this.postsUpdated.asObservable(); // สังเกตุการอัพเดทข้อมูล
  }


  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content};
    this.http.post<{message: string, postId: string}>('http://localhost:5000/api/posts', post)
    .subscribe((responseData) => {
      console.log(responseData.message);
      const id = responseData.postId;
      post.id = id;
      this.posts.push(post); // posts = [{title: title, content: content}]
      this.postsUpdated.next([...this.posts]); //  next เพื่อดึงค่าที่เราสนใจออกมา
    });
  }

  deletePost(postId: string) {
    this.http.delete('http://localhost:5000/api/posts/' + postId)
    .subscribe(() => {
      console.log('Deleted!');
      const updatedPosts = this.posts.filter(post => post.id !== postId);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }
}
