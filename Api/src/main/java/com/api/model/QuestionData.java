package com.api.model;

public class QuestionData {
    private String action;
    private String questionId;
    private String questionTitle;
    private String questionAnswerA;

    private String questionAnswerB;

    private String questionAnswerC;

    private String questionAnswerD;

    private String correctAnswer;

    private String questionNumber;

    private String questionType;

    private int questionDuration;


    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getQuestionId() {
        return questionId;
    }

    public void setQuestionId(String questionId) {
        this.questionId = questionId;
    }

    public String getQuestionTitle() {
        return questionTitle;
    }

    public void setQuestionTitle(String questionTitle) {
        this.questionTitle = questionTitle;
    }

    public String getQuestionAnswerA() {
        return questionAnswerA;
    }

    public void setQuestionAnswerA(String questionAnswerA) {
        this.questionAnswerA = questionAnswerA;
    }

    public String getQuestionAnswerB() {
        return questionAnswerB;
    }

    public void setQuestionAnswerB(String questionAnswerB) {
        this.questionAnswerB = questionAnswerB;
    }

    public String getQuestionAnswerC() {
        return questionAnswerC;
    }

    public void setQuestionAnswerC(String questionAnswerC) {
        this.questionAnswerC = questionAnswerC;
    }

    public String getQuestionAnswerD() {
        return questionAnswerD;
    }

    public void setQuestionAnswerD(String questionAnswerD) {
        this.questionAnswerD = questionAnswerD;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }


    public String getQuestionNumber() {
        return questionNumber;
    }

    public void setQuestionNumber(String questionNumber) {
        this.questionNumber = questionNumber;
    }
    public String getQuestionType() {
        return questionType;
    }

    public void setQuestionType(String questionType) {
        this.questionType = questionType;
    }

    public int getQuestionDuration() {
        return questionDuration;
    }

    public void setQuestionDuration(int questionDuration) {
        this.questionDuration = questionDuration;
    }
}
