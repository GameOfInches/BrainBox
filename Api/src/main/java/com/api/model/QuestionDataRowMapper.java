package com.api.model;
import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;

public class QuestionDataRowMapper implements RowMapper<QuestionData> {

    @Override
    public QuestionData mapRow(ResultSet rs, int rowNum) throws SQLException {
        QuestionData questionData = new QuestionData();
        questionData.setQuestionId(rs.getString("Id"));
        questionData.setQuestionTitle(  rs.getString("questionTitle"));
        questionData.setQuestionAnswerA(rs.getString("questionAnswerA"));
        questionData.setQuestionAnswerB(rs.getString("questionAnswerB"));
        questionData.setQuestionAnswerC(rs.getString("questionAnswerC"));
        questionData.setQuestionAnswerD(rs.getString("questionAnswerD"));
        return questionData;
    }
}

