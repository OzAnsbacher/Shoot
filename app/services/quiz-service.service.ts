import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Quiz, Question } from '../models/question.model';
import { QuizFilter } from '../models/quiz-filter.model';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}

  // Mock the database
  private quiz1: Question[] = [
    {
      _id: 'p123',
      title: 'איזה עיר שוכנת על הים? ',
      answers: ['עכו', 'צפת ', 'באר שבע', 'פתח-תקווה'],
      // img: 'https://www.alltech.co.il/wp-content/uploads/2021/07/%D7%92%D7%9C%D7%95%D7%91%D7%95%D7%A1-%D7%A2%D7%A0%D7%AA%D7%99%D7%A7-franklin.jpg',
      correct: 0,
      score: 10,
      time: 5 * 1000,
    },
    {
      _id: 'p124',
      title: ' מה העיר בירה של ישראל?',
      answers: ['תל אביב', 'ירושלים', 'כרמיאל'],
      img: 'https://www.alltech.co.il/wp-content/uploads/2021/07/%D7%92%D7%9C%D7%95%D7%91%D7%95%D7%A1-%D7%A2%D7%A0%D7%AA%D7%99%D7%A7-franklin.jpg',
      correct: 1,
      score: 10,
      time: 5 * 1000,
    },
  ];
  private quiz2: Question[] = [
    {
      _id: 'p123',
      title: 'מי לא היה רמטכל? ',
      answers: ['דן חלוץ', 'בני גנץ', 'אריאל שרון', 'בוגי יעלון'],
      img: 'https://www.alltech.co.il/wp-content/uploads/2021/07/%D7%92%D7%9C%D7%95%D7%91%D7%95%D7%A1-%D7%A2%D7%A0%D7%AA%D7%99%D7%A7-franklin.jpg',
      correct: 2,
      score: 10,
      time: 5 * 1000,
    },
    {
      _id: 'p124',
      title: ' מי היה ראש הממשלה הראשון?',
      answers: ['גולדה', 'בן גוריון', 'ביבי'],
      img: 'https://www.alltech.co.il/wp-content/uploads/2021/07/%D7%92%D7%9C%D7%95%D7%91%D7%95%D7%A1-%D7%A2%D7%A0%D7%AA%D7%99%D7%A7-franklin.jpg',
      correct: 1,
      score: 10,
      time: 5 * 1000,
    },
  ];

  private _quizsDb: Quiz[] = [
    {
      _id: 'a1',
      pin: 'aa',
      isPlay: true,
      questiones: this.quiz1,
    },
    {
      _id: 'a2',
      pin: 'bb',
      isPlay: true,
      questiones: this.quiz2,
    },
  ];

  private _questiones$ = new BehaviorSubject<Question[]>([]);
  //give to other cmps observable
  public questiones$ = this._questiones$.asObservable();

  private _filterBy$ = new BehaviorSubject<QuizFilter>({
    _id: 'a1',
    pin: 'aa',
  });
  public filterBy$ = this._filterBy$.asObservable();

  public query() {
    const filterBy = this._filterBy$.getValue();
    try {
      const { questiones } = this._quizsDb.filter((quiz) => {
        return quiz.pin === filterBy.pin;
      })[0];
      //pass all var and new cmps can observable if this subscribe
      console.log(questiones);
      this._questiones$.next(questiones);
    } catch (error) {
      console.log(error);
      
    }

    //get all DB
    // const quizs = this._quizsDb;
    //pass all var and new cmps can observable if this subscribe
    // this._quizs$.next(quizs);
  }

  public shouldAdoptQuiz() {
    return this.http
      .get<{ answer: string }>('https://yesno.wtf/api')
      .pipe(map((res) => res.answer));
  }

  public getEmptyQuiz() {
    return { name: '', age: 0, birthDate: new Date() };
  }

  public setFilterBy(filterBy: QuizFilter) {
    this._filterBy$.next(filterBy);
    // this.query();
  }

  // public remove(quizId: string) {
  //   const quizs = this._quizsDb;
  //   const quizIdx = quizs.findIndex(
  //     (quiz) => quiz._id === quizId
  //   );
  //   quizs.splice(quizIdx, 1);
  //   this._quizs$.next(quizs);
  //   return of({});
  // }

  // public getById(quizId: string): Observable<Quiz | void> {
  //   const quiz = this._quizsDb.find(
  //     (quiz) => quiz._id === quizId
  //   );
  //   if (quiz) return of({ ...quiz });
  //   return of();
  // }

  // public save(quiz: Quiz) {
  //   return quiz._id ? this._edit(quiz) : this._add(quiz);
  // }

  // private _add(quiz: Quiz) {
  //   quiz._id = this._makeId();
  //   this._quizsDb.push(quiz);
  //   this._quizs$.next(this._quizsDb);
  //   return of(quiz);
  // }

  // private _edit(quiz: Quiz) {
  //   const quizs = this._quizsDb;
  //   const quizIdx = quizs.findIndex(
  //     (_quiz) => _quiz._id === quiz._id
  //   );
  //   quizs.splice(quizIdx, 1, quiz);
  //   this._quizs$.next(quizs);
  //   return of(quiz);
  // }

  private _makeId(length = 5) {
    var text = '';
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
