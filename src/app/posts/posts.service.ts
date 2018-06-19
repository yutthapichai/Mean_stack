import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})


export class PostsService {
  private posts: Post[] = []; // Post = [ {title:string,content:string} ] = [] เท่ากับค่าว่าง
  private postsUpdated = new Subject<{posts: Post[], postCount: number}>();

  // ถ้ามีการสร้าง object เพื่อเรียกใช้คลาสนี้ก็ให้กำหนดค่า constructor มาด้วย
  constructor( private http: HttpClient, private router: Router ) {}


  getPosts(postsPerPage: number, currentPage: number) {
    // return [...this.posts]; // แสดงค่า object {title:string,content:string}
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    this.http
    .get<{ message: string, posts: any, maxPosts: number }>(
      'http://localhost:5000/api/posts' + queryParams
    )
    .pipe(map((postData) => {
      console.log(postData.message);
      return { posts: postData.posts.map(post => {
        return {
          id: post._id,
          title: post.title,
          content: post.content,
          imagePath: post.imagePath
        };
      }),
        maxPosts: postData.maxPosts
      };
    }))
    .subscribe((transformedpost) => {
      console.log(transformedpost);
      this.posts = transformedpost.posts;
      this.postsUpdated.next({posts: [...this.posts], postCount: transformedpost.maxPosts}); // พุชค่าไปเก็บไว้ในตัวแปล postupdate
    });
  }


  getPostUpdateListener() {
    return this.postsUpdated.asObservable(); // สังเกตุการอัพเดทข้อมูล
  }

  // ข้อมูลที่ต้องการแก้ไข
  getPost(id: string) {
    // return {...this.posts.find(p => p.id === id)};
    return this.http
    .get<{_id: string, title: string, content: string, imagePath: string}>(
      'http://localhost:5000/api/posts/' + id
    );
  }

  // post<{}> คือที่ส่งกลับมา
  addPost(title: string, content: string , image: File) {
    // const post: Post = { id: null, title: title, content: content}; // ค่าเริ่มต้น
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);
    this.http.post<{message: string, post: Post}>
    ('http://localhost:5000/api/posts', postData)
    .subscribe((responseData) => {
      console.log(responseData.message);
      // const id = responseData.postId; // ส่งแค่ id กลับมา
      // post.id = id;
      /* const post: Post = {
        id: responseData.post.id,
        title: title,
        content: content,
        imagePath: responseData.post.imagePath
      };
      this.posts.push(post); // posts = [{title: title, content: content}]
      this.postsUpdated.next([...this.posts]); //  next เพื่อดึงค่าที่เราสนใจออกมา */
      this.router.navigate(['/']);
    });
  }

  updatePost(id: string, title: string, content: string, image: File | string) {
    // const post: Post = { id: id, title: title, content: content, imagePath: null};
    let postData: Post | FormData;
    if (typeof(image) === 'object') { // ตรวจสอบไฟล์รูปใหม่
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image, title);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image
      };
    }
    this.http.put('http://localhost:5000/api/posts/' + id, postData)
    .subscribe(response => {
    /*  const updatedPosts = [...this.posts];
      const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
      const post: Post = {
        id: id,
        title: title,
        content: content,
        imagePath: ''
      };
      updatedPosts[oldPostIndex] = post; // อัพเดทอาร์เรที่ประกาศไว้
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]); */
      this.router.navigate(['/']);
    });
  }

  deletePost(postId: string) {
    return this.http.delete('http://localhost:5000/api/posts/' + postId)
/*    .subscribe(() => {
      console.log('Deleted!');
      const updatedPosts = this.posts.filter(post => post.id !== postId);
      this.posts = updatedPosts; // อัพเดทกล่องอาร์เรที่ประกาศไว้
      this.postsUpdated.next([...this.posts]);
    }) */ ;
  }
}
