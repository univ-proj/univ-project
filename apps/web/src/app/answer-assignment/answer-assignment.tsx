import { useEffect, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Editor from 'react-simple-code-editor';
import { Grid, MenuItem, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism.css'; //Example style, you can use another

import { Button } from '@univ-project/ui';
import * as api from '@univ-project/client-sdk';
import { Answer, Assignment } from '@univ-project/typedefs';

import styles from './answer-assignment.module.css';

type SupportedLanguages = 'javascript' | 'python';
type Views = 'instructions' | 'output';

const assignmentId = '7d6cd9c0-167b-43a0-906f-2b509e5dcd34';

/* eslint-disable-next-line */
export interface AnswerAssignmentProps {}

export function AnswerAssignment(props: AnswerAssignmentProps) {
  // get assignment and populate code description
  const [selectedLanguage, setSelectedLanguage] =
    useState<SupportedLanguages>('javascript');
  const [code, setCode] = useState('');
  const [mdValue, setMdValue] = useState<string | undefined>('');
  const [viewType, setViewType] = useState<Views>('instructions');
  const [result, setResult] = useState<string>('');

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

  const handleViewChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: Views
  ) => {
    setViewType(newAlignment);
  };

  useEffect(() => {
    populateData();
  }, []);

  async function populateData() {
    // loading
    const assignment = await api.getResource<Assignment>(
      'assignment',
      assignmentId,
      {
        expand: 'code_description',
      }
    );

    const { initial_code_snippet, description } = assignment.code_description;
    setCode(initial_code_snippet);
    setMdValue(description);
    // disable loading
  }

  const tryout = async () => {
    const result = await api.codeRunner.run(code, selectedLanguage);

    setResult(result);
  };

  const submitAnswer = async () => {
    await api.createResource<Answer>('answer', {
      // @ts-ignore
      assignment: assignmentId,
      type: 'code',
      code,
    });
  };

  return (
    <div className={styles['container']}>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <ToggleButtonGroup
            color="primary"
            value={viewType}
            exclusive
            onChange={handleViewChange}
          >
            <ToggleButton value="instructions">Instructions</ToggleButton>
            <ToggleButton value="output">Output</ToggleButton>
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

          <Button onClick={tryout}>Tryout</Button>
          <Button onClick={submitAnswer}>Submit</Button>
        </Grid>

        <Grid item xs={5}>
          {viewType === 'instructions' ? (
            <MDEditor
              preview={'preview'}
              hideToolbar={true}
              value={mdValue}
              // onChange={(val) => setMdValue(val)}
            />
          ) : (
            <Editor
              value={result}
              onValueChange={() => {}}
              readOnly={true}
              highlight={(code) => code}
              padding={10}
              className={styles['editor']}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 18,
                outline: 0,
              }}
            />
          )}
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

export default AnswerAssignment;
