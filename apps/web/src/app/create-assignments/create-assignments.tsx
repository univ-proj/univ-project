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
import logo from '../../assets/Logo1.svg';

type SupportedLanguages = 'javascript' | 'python';

const initialStyle = {
  description: {
    border: '1px solid #6247aa',
    color: '#6247aa',
    backgroundColor: '#ece6f7',
  },
  preview: {
    border: '1px solid #8372b4',
    color: '#8372b4',
    backgroundColor: 'white',
  },
};

/* eslint-disable-next-line */
export interface CreateAssignmentsProps {}

export function CreateAssignments(props: CreateAssignmentsProps) {
  const [value, setValue] = useState<string>();
  const [selectedLanguage, setSelectedLanguage] =
    useState<SupportedLanguages>('javascript');
  const [previewType, setPreviewType] = useState<'edit' | 'preview'>('edit');
  const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`);
  const [assignmentName, setAssignmentName] = useState<string>('');
  const [style, setStyle] = useState(initialStyle);

  const toggle = (style: string) => {
    switch (style) {
      case 'description':
        setStyle({
          description: {
            border: '1px solid #6247aa',
            color: '#6247aa',
            backgroundColor: '#ece6f7',
          },
          preview: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
        });
        setPreviewType('edit');
        break;
      case 'preview':
        setStyle({
          description: {
            border: '1px solid #8372b4',
            color: '#8372b4',
            backgroundColor: 'white',
          },
          preview: {
            border: '1px solid #6247aa',
            color: '#6247aa',
            backgroundColor: '#ece6f7',
          },
        });
        setPreviewType('preview');
        break;
      default:
        break;
    }
  };

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
      // @ts-ignore
      course: '', // TODO: add course id
      type: 'code',
      // @ts-ignore
      code_description: codeDescription.id,
    });

    // Todo: redirect to assignment listing page
  };

  return (
    // <div className={styles['container']}>
    //   <Button onClick={createAssignment}>Submit</Button>

    //   <Grid container spacing={2}>
    //     <Grid item xs={5}>
    //       <Input
    //         type="text"
    //         placeholder="Enter title here"
    //         value={assignmentName}
    //         onChange={(e: any) => setAssignmentName(e.target.value)}
    //       />
    //       <ToggleButtonGroup
    //         color="primary"
    //         value={previewType}
    //         exclusive
    //         onChange={handleChange}
    //       >
    //         <ToggleButton value="edit">Description</ToggleButton>
    //         <ToggleButton value="preview">Preview</ToggleButton>
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
    //     </Grid>

    //     <Grid item xs={5}>
    //       <MDEditor
    //         preview={previewType}
    //         hideToolbar={true}
    //         value={value}
    //         onChange={(val) => setValue(val)}
    //       />
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

    <div className={styles['create_assignment_page']}>
      <div className={styles['logo_button_container']}>
        <img alt="fff" className={styles['logo']} src={logo} />
        <Button size="medium" onClick={createAssignment}>
          Submit
        </Button>
      </div>

      <div className={styles['input_container']}>
        <input
          id="title"
          name="title"
          className={styles['input']}
          value={assignmentName}
          onChange={(e: any) => setAssignmentName(e.target.value)}
          placeholder="Enter title here"
        />
      </div>

      <div className={styles['boxes_container']}>
        <div className={styles['description_preview_box']}>
          <div
            className={styles['description_box']}
            style={style.description}
            onClick={() => toggle('description')}
          >
            <div className={styles['box_text']}>Description</div>
          </div>

          <div
            className={styles['preview_box']}
            style={style.preview}
            onClick={() => toggle('preview')}
          >
            <div className={styles['box_text']}>Preview</div>
          </div>
        </div>

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
      </div>

      <div className={styles['textarea_editor_conatiner']}>
        <MDEditor
          preview={previewType}
          hideToolbar={true}
          value={value}
          onChange={(val) => setValue(val)}
          style={{
            width: '491px',
            height: '634px',
            fontSize: '14px',
            color: '#6247AA',
            backgroundColor: '#ECE6F7',
          }}
        />

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

export default CreateAssignments;
