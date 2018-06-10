import { Component, Input } from '@angular/core';

@Component ({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
/*  posts = [
    { title: 'First Post', content: 'This is the step Programmer' },
    { title: 'Second Post', content: 'This is the step Programmer junuir' },
    { title: 'Third Post', content: 'This is the step Programmerz senuir' }
  ];
*/
  @Input() posts = [];
}
