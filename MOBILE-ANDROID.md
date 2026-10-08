# Turf Roster — Android APK (Capacitor)

This project is prepared to package the existing React/Vite web app as a real Android app with Capacitor. It is **not a PWA**. The web UI is bundled into a native Android WebView container and the app is installed as a normal signed APK.

## 1. Production API

Before building the APK, set `client/.env.production`:

```env
VITE_API_URL=https://api.yourdomain.com/api
```

Never put MongoDB credentials, JWT signing secrets, private keys, or other server secrets in this file. Anything in `client/dist` can be extracted from the APK.

## 2. Install Capacitor

From the repository root:

```bash
npm install
npm run install:all
```

Then add the Android platform once:

```bash
npx cap add android
```

## 3. Build and sync

```bash
npm run mobile:build
npx cap sync android
```

Open Android Studio:

```bash
npx cap open android
```

## 4. Android app identity

Current values:

- App name: `Turf Roster`
- Application ID: `com.turfroster.app`
- Version name: `1.0.0`
- Version code: `1`

Change these in Android Studio / `android/app/build.gradle` when you are ready for a real release.

## 5. Icon and splash

Generate Android resources from the supplied branding assets using the Capacitor Assets tool, or replace the generated Android mipmap/drawable resources in Android Studio. Do not store signing keys in the repository.

## 6. Release signing

Create a release keystore and keep it outside source control. Example:

```bash
keytool -genkeypair -v -keystore turf-roster-release.jks -alias turf-roster -keyalg RSA -keysize 4096 -validity 10000
```

Then in Android Studio use **Build → Generate Signed Bundle / APK → APK → Release**, select the keystore, and build.

The release APK will be under:

```text
android/app/build/outputs/apk/release/app-release.apk
```

Keep the same signing key forever for updates. If the key is lost, an existing installed app cannot be updated normally with a differently signed APK.

## 7. Verify the APK

```bash
apksigner verify --verbose android/app/build/outputs/apk/release/app-release.apk

certutil -hashfile android/app/build/outputs/apk/release/app-release.apk SHA256
```

Publish the SHA-256 fingerprint alongside the download when appropriate.

## 8. HTTPS hosting

Host the final APK on your own HTTPS domain, for example:

```text
https://yourdomain.com/downloads/turf-roster.apk
```

Do not serve the APK over HTTP. If using Cloudflare Pages, put the APK in the deployed static assets if it is within the platform's file-size limits; otherwise use Cloudflare R2 or another HTTPS object store behind your domain.

## 9. User installation

Android may show an “Install unknown apps” warning because the APK was downloaded outside Google Play. The user can allow installation for the browser/file manager they used, install the APK, and then turn that permission back off. The APK must remain signed with the same release key for future updates.

## 10. Release workflow

```text
React/Vite web app
      ↓
VITE_API_URL = HTTPS production API
      ↓
npm run mobile:build
      ↓
npx cap sync android
      ↓
Android Studio
      ↓
Release signing with private keystore
      ↓
app-release.apk
      ↓
SHA-256 verification
      ↓
HTTPS website /downloads/turf-roster.apk
      ↓
User downloads APK
      ↓
Allow installation from that browser
      ↓
Install
      ↓
Normal Android app
```
