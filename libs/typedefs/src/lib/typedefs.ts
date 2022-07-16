type AssignmentTypes = 'file' | 'code';
type GenderTypes = 'male' | 'female';

export interface Answer {
  type: AssignmentTypes;
  file: File;
  code: string;
  student: Student;
}
export interface Class {
  name: string;
  date: Date;
  type: 'section' | 'lecture';
  canceled: boolean;
  location: string;
  course: Course;
  group: Group;
  section: Section;
  lecturer: Staff;

  // relations
  attendance: Attendance[];
  files: File[];
}
export interface File {
  name: string;
  url: string;
  mime_type: string;
}
export interface Level {
  name: string;
  programs: Program[];
  students: Student[];
  groups: Group[];
}

export interface Quiz {
  name: string;
  class: Class;
  type: AssignmentTypes;
  file: File;
  code_description: CodeDescription;

  // relations
  answers: Answer[];
}

export interface Student {
  name: string;
  phone: string;
  birth_date: Date;
  gender: GenderTypes;
  address: string;
  email: string;
  password: string;
  level: Level;
  program: Program;
  group: Group;
  section: Section;

  // relations
  attendance: Attendance[];
  courses: Course[];
}

export interface Assignment {
  name: string;
  course: Course | string;
  type: AssignmentTypes;
  file: File | string;
  code_description: CodeDescription | string;

  // relations
  answers: Answer[];
}

export interface CodeDescription {
  description: string;
  initial_code_snippet: string;
}

export interface Group {
  name: string;
  level: Level;

  // relations
  classes: Class[];
  students: Student[];
  sections: Section[];
}

export interface Section {
  name: string;
  course: Course;
  group: Group;

  // relations
  classes: Class[];
  students: Student[];
}

export interface Attendance {
  attended: boolean;
  student: Student | string;
  class: Class | string;
}

export interface Course {
  name: string;
  optional: boolean;
  program: Program;
  assignments: Assignment[];
  quizzes: Quiz[];

  // relations
  classes: Class[];
}

export interface Program {
  name: string;
  level: Level;

  // relations
  courses: Course[];
  students: Student[];
}

export interface Staff {
  name: string;
  phone: string;
  birth_date: Date;
  gender: GenderTypes;
  address: string;
  email: string;
  password: string;

  // relations
  courses: Course[];
}
