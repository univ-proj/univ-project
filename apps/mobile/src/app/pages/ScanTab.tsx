import React, { useEffect } from 'react';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Button } from '@univ-project/ui';

import './Tab1.css';

const ScanTab: React.FC = () => {
  const prepare = () => {
    // BarcodeScanner.hideBackground();

    BarcodeScanner.prepare();
  };

  const startScan = async () => {
    const result = await BarcodeScanner.startScan().catch(console.log);
    if (result?.hasContent) {
      console.log(result?.content, '====================');
    }
  };

  const stopScan = () => {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
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

  useEffect(() => {
    (async () => {
      await checkPermission();
      await prepare();
    })();
  }, []);

  return (
    <div>
      <div id="scanner-ui" className="scanner-ui">
        <div className="sample-background"></div>
        <div className="container">
          <div className="barcode-scanner--area--container">
            <div className="relative">
              <p>Kameranızı bir barkoda doğrultun</p>
            </div>
            <div className="square surround-cover">
              <div className="barcode-scanner--area--outer surround-cover">
                <div className="barcode-scanner--area--inner">
                  <Button icon="qr_code" onClick={startScan}>
                    Scan
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanTab;
