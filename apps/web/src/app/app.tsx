// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';

import AllSubjects from './pages/all-subjects/all-subjects';
import AnswerAssignment from './answer-assignment/answer-assignment';
import CreateAssignments from './create-assignments/create-assignments';
import SubjectSection from './subject-section/subject-section';

export function App() {
  return (
    <AnswerAssignment />
    // <CreateAssignments />
    // <SubjectSection />
  );
}

export default App;
