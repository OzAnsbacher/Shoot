import { ActivatedRoute } from '@angular/router';
import { Question } from './../../models/question.model';
import { QuizService } from './../../services/quiz-service.service';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';

@Component({
  selector: 'quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute
  ) {}
  // questions!: Question[];
  question!: Question;
  questions$!: Observable<Question[]>;
  subscription!: Subscription;
  prm = Promise.resolve('Resolved!!!!');
  selectedPetId!: string;
  i = 0;
  // questionInterval: TimeInterval<number>;

  ngOnInit(): void {
    this.route.params.subscribe(({ code }) => {
      this.quizService.setFilterBy({ pin: code });
    });

    this.quizService.query();
    this.subscription = this.quizService.questiones$.subscribe((questions) => {
      this.question = questions[0];
      setInterval(() => {
        this.question = questions[this.i];
        this.i++;
      }, questions[this.i]?.time);
    });
  }
  onNextAnswer() {}
}
