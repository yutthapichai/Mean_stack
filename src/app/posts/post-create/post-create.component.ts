import { Component, EventEmitter, Output } from '@angular/core';

@Component ({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  enteredTitle   = '';
  enteredContent = '';
  @Output() postCreated    = new EventEmitter();

  onAddPost() {
    if (this.enteredContent === '') {
      alert('please input Content');
    } else {
      const post = {
        title:   this.enteredTitle,
        content: this.enteredContent
      };
      this.postCreated.emit(post);
    }
  }
}
