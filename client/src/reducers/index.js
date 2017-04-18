import { combineReducers } from 'redux';
import { QuestionReducer } from './question-reducer';

const rootReducer = combineReducers({
  question: QuestionReducer,
});

export default rootReducer;
