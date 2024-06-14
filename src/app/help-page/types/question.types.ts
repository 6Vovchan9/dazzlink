export interface IQuestionsContent {
    question: string;
    answer: string;
}

export interface IQuestions extends IQuestionsContent {
    active: boolean;
}