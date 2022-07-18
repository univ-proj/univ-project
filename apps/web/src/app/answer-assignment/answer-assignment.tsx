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
import logo from '../../assets/Logo1.svg';

import styles from './answer-assignment.module.css';

type SupportedLanguages = 'javascript' | 'python';
type Views = 'instructions' | 'output';

const assignmentId = '7d6cd9c0-167b-43a0-906f-2b509e5dcd34';

const initialStyle = {
  instructions: {
    border: '1px solid #6247aa',
    color: '#6247aa',
    backgroundColor: '#ece6f7',
  },
  output: {
    border: '1px solid #8372b4',
    color: '#8372b4',
    backgroundColor: 'white',
  },
};

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
  const [style, setStyle] = useState(initialStyle);

  const toggle = (style: string) => {
    switch (style) {
      case 'instructions':
        setStyle({
          instructions: {
            border: '1px solid #6247aa',
            color: '#6247aa',
            backgroundColor: '#ece6f7',
          },
          output: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
        });
        setViewType('instructions');
        break;
      case 'output':
        setStyle({
          instructions: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          output: {
            border: '1px solid #6247aa',
            color: '#6247aa',
            backgroundColor: '#ece6f7',
          },
        });
        setViewType('output');
        break;
      default:
        break;
    }
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
    // <div className={styles['container']}>
    //   <Grid container spacing={2}>
    //     <Grid item xs={5}>
    //       <ToggleButtonGroup
    //         color="primary"
    //         value={viewType}
    //         exclusive
    //         onChange={handleViewChange}
    //       >
    //         <ToggleButton value="instructions">Instructions</ToggleButton>
    //         <ToggleButton value="output">Output</ToggleButton>
    //       </ToggleButtonGroup>
    //     </Grid>

    //     <Grid item xs={7}>
    //       <Select
    //         labelId="demo-simple-select-label"
    //         id="demo-simple-select"
    //         value={selectedLanguage}
    //         label="Age"
    //         onChange={handleSelectChange}
    //       >
    //         <MenuItem value={'javascript'}>JavaScript</MenuItem>
    //         <MenuItem value={'python'}>Python</MenuItem>
    //       </Select>

    //       <Button onClick={tryout}>Tryout</Button>
    //       <Button onClick={submitAnswer}>Submit</Button>
    //     </Grid>

    //     <Grid item xs={5}>
    //       {viewType === 'instructions' ? (
    //         <MDEditor
    //           preview={'preview'}
    //           hideToolbar={true}
    //           value={mdValue}
    //           // onChange={(val) => setMdValue(val)}
    //         />
    //       ) : (
    //         <Editor
    //           value={result}
    //           onValueChange={() => {}}
    //           readOnly={true}
    //           highlight={(code) => code}
    //           padding={10}
    //           className={styles['editor']}
    //           style={{
    //             fontFamily: '"Fira code", "Fira Mono", monospace',
    //             fontSize: 18,
    //             outline: 0,
    //           }}
    //         />
    //       )}
    //     </Grid>

    //     <Grid item xs={7}>
    //       <Editor
    //         value={code}
    //         onValueChange={(code) => setCode(code)}
    //         highlight={(code) =>
    //           highlightWithLineNumbers(code, selectedLanguage)
    //         }
    //         padding={10}
    //         className={styles['editor']}
    //         style={{
    //           fontFamily: '"Fira code", "Fira Mono", monospace',
    //           fontSize: 18,
    //           outline: 0,
    //         }}
    //       />
    //     </Grid>
    //   </Grid>
    // </div>

    <div className={styles['answer_assignment_page']}>
      <img alt="fff" className={styles['logo']} src={logo} />

      <div className={styles['text']}>
        Create a calculator using switch statement
      </div>

      <div className={styles['boxes_container']}>
        <div className={styles['instruction_output_box']}>
          <div
            className={styles['instruction_box']}
            style={style.instructions}
            onClick={() => toggle('instructions')}
          >
            <div className={styles['box_text']}>Instructions</div>
          </div>

          <div
            className={styles['output_box']}
            style={style.output}
            onClick={() => toggle('output')}
          >
            <div className={styles['box_text']}>Output</div>
          </div>
        </div>

        <div className={styles['buttons_conatiner']}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedLanguage}
            label="Age"
            onChange={handleSelectChange}
            sx={{ width: '160px', height: '40px' }}
          >
            <MenuItem value={'javascript'}>JavaScript</MenuItem>
            <MenuItem value={'python'}>Python</MenuItem>
          </Select>

          <Button size="medium" onClick={submitAnswer}>
            Submit
          </Button>
        </div>
      </div>

      <div className={styles['textarea_editor_conatiner']}>
        {viewType === 'instructions' ? (
          <MDEditor
            preview={'preview'}
            hideToolbar={true}
            value={mdValue}
            style={{
              width: '491px',
              borderRadius: '8px',
              color: '#6247AA',
              backgroundColor: '#ECE6F7',
            }}
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
              width: '491px',
              borderRadius: '8px',
              color: '#6247AA',
              backgroundColor: '#ECE6F7',
            }}
          />
        )}

        <Editor
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) => highlightWithLineNumbers(code, selectedLanguage)}
          padding={10}
          className={styles['editor']}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 18,
            outline: 0,
            width: '693px',
          }}
        />
      </div>
    </div>
  );
}

export default AnswerAssignment;
