import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss'],
})
export class AnswersComponent implements OnInit {
  constructor() {}
  @Input() answers!: Array<string> | null;
  @Output() onAnswer = new EventEmitter<number>();
  ngOnInit(): void {}

  // onAnswer(){
  //   console.log(111);
    
  // }
}
