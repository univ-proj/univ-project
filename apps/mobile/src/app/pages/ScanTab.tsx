import React, { useEffect, useState } from 'react';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Button } from '@univ-project/ui';
import Modal from '@material-ui/core/Modal';
import * as api from '@univ-project/client-sdk';

import './ScanTab.css';
import { Attendance } from '@univ-project/typedefs';
import { IonLoading } from '@ionic/react';

const ScanTab: React.FC = () => {
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModalType, setShowModalType] = useState<string>();

  const startScan = () => {
    // disable button
    setDisabled(true);
    BarcodeScanner.startScan()
      .then(async (result) => {
        if (result.hasContent) {
          // try to add attendance

          // loading screen
          setLoading(true);
          await api.createResource<Attendance>('attendance', {
            attended: true,
            student: '00faf229-2c95-45b5-bab0-6b3959647436',
            class: '000edfcc-cfc5-4854-90bd-0e7cc37735c6',
          });

          // show confirmation message
          showConfirmationMessage();

          return;
        }

        // show error message invalid qr code
        showErrorMessage('Invalid QR Code');
        return;
      })
      .catch(() => {
        showErrorMessage('Invalid Class');
      })
      .finally(() => {
        // navigate back
        setTimeout(() => {
          window.history.back();
        }, 3000);

        // stop loading screen
        setLoading(false);
        // stop camera
        BarcodeScanner.stopScan();
        // enable button
        setDisabled(false);
      });
  };

  const checkPermission = async () => {
    // check or request permission
    const status = await BarcodeScanner.checkPermission({ force: true });

    if (status.granted) {
      // the user granted permission
      return true;
    }

    return false;
  };

  const showConfirmationMessage = () => {
    // show confirmation model
    setShowModalType('confirm');
  };

  const showErrorMessage = (message: string) => {
    // show error model
    setShowModalType('error');

    setTimeout(() => {
      setShowModalType('');
    }, 3000);
  };

  useEffect(() => {
    (async () => {
      await checkPermission();
      await BarcodeScanner.prepare();
    })();
  }, []);

  return (
    <div className="scan-container">
      <IonLoading isOpen={loading} />
      <div>
        <Button
          disabled={loading || disabled}
          icon="qr_code"
          onClick={startScan}
        >
          Scan
        </Button>
      </div>
      <Modal open={showModalType === 'confirm'}>
        <div>Hello there</div>
      </Modal>
      <Modal open={showModalType === 'error'}>
        <div>err</div>
      </Modal>
    </div>
  );
};

export default ScanTab;
