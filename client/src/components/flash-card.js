import React from 'react';

export default function FlashCard(props) {
    const currentQuestion = props.currentQuestion
    return (
        <div className="flash-card">
            <h1>Dothraki Word: {currentQuestion.wordDothraki}</h1>
            <h3>English: Word: {currentQuestion.wordEnglish}</h3>
            <div className="user-status">
                <p>Difficulty: {currentQuestion.difficulty}</p>
            </div>
            <form className="flash-card-answer">
                <label>Input Your Answer:
                </label>
                <input type="text" placeholder="English Equivalent"></input>
                <button type="submit">Submit Answer</button>
            </form>
        </div>
    );
}
