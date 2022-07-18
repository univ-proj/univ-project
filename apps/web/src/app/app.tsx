// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { useContext } from 'react';
import AnswerAssignment from './answer-assignment/answer-assignment';
import { UserContext } from './context/userContext';
import CreateAssignments from './create-assignments/create-assignments';
import PublicRoute from './public-route/public-route';
import SignIn from './sign-in/sign-in';
import SubjectSection from './subject-section/subject-section';
import { Route, Redirect } from 'react-router-dom';

export function App() {
  return (
    // <AnswerAssignment />
    // <CreateAssignments />
    // <SubjectSection />
    <div>
      <PublicRoute path="/" component={SignIn} exact />
    </div>

    // <Route  componet={}/>
  );
}

export default App;
