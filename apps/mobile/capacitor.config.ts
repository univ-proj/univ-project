import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'mobile',
  webDir: '../../dist/apps/mobile',
  bundledWebRuntime: false,
  server: {
    cleartext: true,
  },
};

export default config;
