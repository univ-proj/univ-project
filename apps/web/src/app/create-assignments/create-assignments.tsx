import { useEffect, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Editor from 'react-simple-code-editor';
import {
  Grid,
  Input,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism.css'; //Example style, you can use another

import { Button, Inputs } from '@univ-project/ui';
import * as api from '@univ-project/client-sdk';
import styles from './create-assignments.module.css';
import { Assignment, CodeDescription } from '@univ-project/typedefs';

type SupportedLanguages = 'javascript' | 'python';

/* eslint-disable-next-line */
export interface CreateAssignmentsProps {}

export function CreateAssignments(props: CreateAssignmentsProps) {
  const [value, setValue] = useState<string>();
  const [selectedLanguage, setSelectedLanguage] =
    useState<SupportedLanguages>('javascript');
  const [previewType, setPreviewType] = useState<'edit' | 'preview'>('edit');
  const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`);
  const [assignmentName, setAssignmentName] = useState<string>('');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: 'edit' | 'preview'
  ) => {
    setPreviewType(newAlignment);
  };

  function handleSelectChange(event: SelectChangeEvent) {
    console.log(event.target.value);
    setSelectedLanguage(event.target.value as SupportedLanguages);
  }

  const highlightWithLineNumbers = (
    code: string,
    language: SupportedLanguages
  ) =>
    highlight(code, languages[language], language)
      .split('\n')
      .map(
        (line, i) =>
          `<span class=${styles['editorLineNumber']}>${i + 1}</span>${line}`
      )
      .join('\n');

  const createAssignment: React.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    const codeDescription = await api.createResource<CodeDescription>(
      'code_description',
      {
        description: value,
        initial_code_snippet: code,
      }
    );

    const assignment = await api.createResource<Assignment>('assignment', {
      name: assignmentName,
      course: '', // TODO: add course id
      type: 'code',
      code_description: codeDescription.id,
    });

    // Todo: redirect to assignment listing page
  };

  return (
    <div className={styles['container']}>
      <Button onClick={createAssignment}>Submit</Button>

      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Input
            type="text"
            placeholder="Enter title here"
            value={assignmentName}
            onChange={(e: any) => setAssignmentName(e.target.value)}
          />
          <ToggleButtonGroup
            color="primary"
            value={previewType}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton value="edit">Description</ToggleButton>
            <ToggleButton value="preview">Preview</ToggleButton>
          </ToggleButtonGroup>
        </Grid>

        <Grid item xs={7}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedLanguage}
            label="Age"
            onChange={handleSelectChange}
          >
            <MenuItem value={'javascript'}>JavaScript</MenuItem>
            <MenuItem value={'python'}>Python</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={5}>
          <MDEditor
            preview={previewType}
            hideToolbar={true}
            value={value}
            onChange={(val) => setValue(val)}
          />
        </Grid>

        <Grid item xs={7}>
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) =>
              highlightWithLineNumbers(code, selectedLanguage)
            }
            padding={10}
            className={styles['editor']}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 18,
              outline: 0,
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default CreateAssignments;
