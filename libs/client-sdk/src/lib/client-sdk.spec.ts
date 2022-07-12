import { Student, Course } from '@univ-project/typedefs';
import * as _ from 'lodash';
import * as api from './client-sdk';

describe('clientSdk', () => {
  const studentBody = {
    name: 'Mahmoud',
    email: 'mahmoudelzoka@gmail.com',
  };
  let id: string;

  describe('resources', () => {
    test('createResource', async () => {
      const result = await api.createResource<Student>('student', studentBody);

      id = result.id;
      expect(result).toEqual(expect.objectContaining(studentBody));
    });

    test('updateResource', async () => {
      const updateName = 'Ahmed';
      const result = await api.updateResource<Student>('student', {
        id,
        name: updateName,
      });

      studentBody.name = updateName;

      expect(result).toEqual(expect.objectContaining({ name: updateName }));
    });

    test('getResource', async () => {
      const result = await api.getResource<Student>('student', id);

      expect(result).toEqual(expect.objectContaining(studentBody));
    });

    test('deleteResource', async () => {
      const result = await api.deleteResource<Student>('student', id);

      expect(result).toEqual(expect.objectContaining(studentBody));

      const fetchedRequest = api.getResource<Student>('student', id);

      await expect(fetchedRequest).rejects.toThrowError();
    });
  });

  describe('relations', () => {
    let student: Student & { id: string };
    let course: Course & { id: string };
    beforeAll(async () => {
      student = await api.createResource<Student>('student', studentBody);
      course = await api.createResource<Course>('course', { name: 'Course 1' });
    });

    afterAll(async () => {
      await api.deleteResource<Student>('student', student.id);
      await api.deleteResource<Course>('course', course.id);
    });

    test('createRelations', async () => {
      await api.createRelations({
        src_model: 'student',
        src_id: student.id,
        dst_id: course.id,
        name: 'courses',
      });

      // not to throw
      expect.assertions(0);
    });

    test('listRelations', async () => {
      const result = await api.listRelations<Course>({
        src_model: 'student',
        src_id: student.id,
        name: 'courses',
      });

      expect(result).toEqual(
        expect.arrayContaining([
          expect.objectContaining(_.omit(course, 'classes')),
        ])
      );
    });

    test('deleteRelations', async () => {
      await api.deleteRelations({
        src_model: 'student',
        src_id: student.id,
        dst_id: course.id,
        name: 'courses',
      });

      const result = await api.listRelations<Course>({
        src_model: 'student',
        src_id: student.id,
        name: 'courses',
      });

      expect(result).toHaveLength(0);
    });
  });
});
