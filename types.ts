export enum Subject {
  CHINESE = '國文',
  ENGLISH = '英語',
  MATH = '數學',
  NATURE = '自然',
  SOCIETY = '社會'
}

export interface Question {
  id: number;
  description: string;
  options: {
    label: string;
    content: string;
  }[];
  correctAnswer: string; // 'A', 'B', 'C', or 'D'
  explanation: string;
}

export interface ExamPaper {
  title: string;
  subject: Subject;
  questions: Question[];
}

export interface GenerationConfig {
  apiKey: string;
  subject: Subject;
  topic: string;
  sourceText: string;
  questionCount: number;
}