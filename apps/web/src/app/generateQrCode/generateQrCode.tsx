import React from 'react';
import styles from './genrateQrCode.module.css';
import logo from '../../assets/Logo1.svg';
import qrCode from '../../assets/QR.svg';
import { Avatar } from '@mui/material';

const GenerateQrCode = () => {
  return (
    <div className={styles['qrCode_page']}>
      <div className={styles['logo_students_container']}>
        <div>
          <img alt="FFF" className={styles['logo']} src={logo} />

          <div className={styles['qrCode_container']}>
            <img alt="FFF" src={qrCode} />
          </div>

          <div className={styles['qrCode_text']}>
            Please scan the QR code to submit your attendance
          </div>
        </div>

        <div className={styles['students_container']}>
          <div className={styles['student_container']}>
            <Avatar
              alt="student_img"
              sx={{ width: '40px', height: '40px' }}
              src=""
            />
            <div className={styles['student_name']}>Mahmoud Selem</div>
          </div>

          <div className={styles['student_container']}>
            <Avatar
              alt="student_img"
              sx={{ width: '40px', height: '40px' }}
              src=""
            />
            <div className={styles['student_name']}>Mahmoud Selem</div>
          </div>

          <div className={styles['student_container']}>
            <Avatar
              alt="student_img"
              sx={{ width: '40px', height: '40px' }}
              src=""
            />
            <div className={styles['student_name']}>Mahmoud Selem</div>
          </div>

          <div className={styles['student_container']}>
            <Avatar
              alt="student_img"
              sx={{ width: '40px', height: '40px' }}
              src=""
            />
            <div className={styles['student_name']}>Mahmoud Selem</div>
          </div>

          <div className={styles['student_container']}>
            <Avatar
              alt="student_img"
              sx={{ width: '40px', height: '40px' }}
              src=""
            />
            <div className={styles['student_name']}>Mahmoud Selem</div>
          </div>

          <div className={styles['student_container']}>
            <Avatar
              alt="student_img"
              sx={{ width: '40px', height: '40px' }}
              src=""
            />
            <div className={styles['student_name']}>Mahmoud Selem</div>
          </div>

          <div className={styles['student_container']}>
            <Avatar
              alt="student_img"
              sx={{ width: '40px', height: '40px' }}
              src=""
            />
            <div className={styles['student_name']}>Mahmoud Selem</div>
          </div>

          <div className={styles['student_container']}>
            <Avatar
              alt="student_img"
              sx={{ width: '40px', height: '40px' }}
              src=""
            />
            <div className={styles['student_name']}>Mahmoud Selem</div>
          </div>

          <div className={styles['student_container']}>
            <Avatar
              alt="student_img"
              sx={{ width: '40px', height: '40px' }}
              src=""
            />
            <div className={styles['student_name']}>Mahmoud Selem</div>
          </div>

          <div className={styles['student_container']}>
            <Avatar
              alt="student_img"
              sx={{ width: '40px', height: '40px' }}
              src=""
            />
            <div className={styles['student_name']}>Mahmoud Selem</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateQrCode;
