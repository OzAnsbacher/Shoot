export interface Question {
  _id: string;
  title: string;
  answers: Array<string>;
  img?: string;
  correct: number;
  score: number;
  time: number
}

export interface Quiz {
  _id: string;
  pin: string;
  isPlay:boolean,
  questiones: Question[];
}
