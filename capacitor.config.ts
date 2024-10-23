import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'appApuntes',
  webDir: 'www',
  plugins: {
    PushNotifications: {
      presentationOptions: ['alert', 'badge', 'sound'], // Opciones de presentación para notificaciones
    },
  },
};

export default config;
