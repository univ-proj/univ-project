// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';

import { useContext } from 'react';
import AllSubjects from './pages/all-subjects/all-subjects';
import AnswerAssignment from './answer-assignment/answer-assignment';
import { UserContext } from './context/userContext';
import CreateAssignments from './create-assignments/create-assignments';
import PublicRoute from './public-route/public-route';
import SignIn from './sign-in/sign-in';
import SubjectSection from './subject-section/subject-section';
import { Route, Redirect } from 'react-router-dom';
import PrivateRoute from './private-route/private-route';
import UserViews from './user-views/user-views';

export function App() {
  return (
    // <AnswerAssignment />
    // <CreateAssignments />
    // <SubjectSection />
    <div>
      <PublicRoute path="/" component={SignIn} exact />
      <PrivateRoute path="/studentView" component={UserViews} />
      <PrivateRoute path="/staffView" component={AllSubjects} />
      <PrivateRoute path="/subjectSection" component={SubjectSection} />
      <PrivateRoute path="/createAssignmet" component={CreateAssignments} />
      <PrivateRoute path="/answerAssignment" component={AnswerAssignment} />
    </div>

    // <Route  componet={}/>
  );
}

export default App;
