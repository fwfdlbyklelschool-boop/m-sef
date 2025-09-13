
export enum AppState {
  LANDING,
  SIGNUP,
  QUESTIONNAIRE,
  INTERESTS,
  FINDING_MATCHES,
  DASHBOARD,
}

export interface Question {
  id: string;
  text: string;
  options: string[];
}

export interface QuestionAnswer {
  question: string;
  answer: string;
}

export interface UserProfile {
  name: string;
  gender: string;
  age: number;
  email: string;
  phone: string;
  interests: string[];
  answers: QuestionAnswer[];
}

export interface Match {
  id: string;
  name: string;
  age: number;
  shortBio: string;
  avatarUrl: string;
}
