import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.turfroster.app",
  appName: "Turf Roster",
  webDir: "client/dist",
  bundledWebRuntime: false,
  android: {
    allowMixedContent: false
  },
  server: {
    androidScheme: "https"
  }
};

export default config;
