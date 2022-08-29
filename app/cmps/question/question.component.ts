import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  constructor() {}
  @Input() question!: Question;
  @Output() nextAnswer: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {}

  onSelectAnswer(idx: number) {
    if (idx === this.question.correct) console.log('correct');
    else console.log('no good');
    this.nextAnswer.emit();
  }
}
