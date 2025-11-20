# GitHub Actions CI/CD Setup

This workflow automatically builds an APK and creates a GitHub release when you push to the main branch.

## Setup Instructions

### 1. Generate Android Signing Key

Create a keystore for signing your APK:

```bash
keytool -genkeypair -v -storetype PKCS12 -keystore skillup-release.keystore -alias skillup-key -keyalg RSA -keysize 2048 -validity 10000
```

### 2. Convert Keystore to Base64

```bash
# On Windows PowerShell:
[Convert]::ToBase64String([IO.File]::ReadAllBytes("skillup-release.keystore")) | Out-File -Encoding ASCII keystore.txt

# On macOS/Linux:
base64 -i skillup-release.keystore -o keystore.txt
```

### 3. Add GitHub Secrets

Go to **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Required secrets:
- `EXPO_TOKEN` - Get from `npx expo login` then `npx expo whoami --json`
- `ANDROID_SIGNING_KEY` - Base64 content from `keystore.txt`
- `ANDROID_KEY_ALIAS` - Alias used (e.g., `skillup-key`)
- `ANDROID_KEYSTORE_PASSWORD` - Keystore password
- `ANDROID_KEY_PASSWORD` - Key password

### 4. Trigger a Release

Update version in `package.json` and push to main:

```bash
git add package.json
git commit -m "Bump version to 1.0.1"
git push origin main
```

The workflow will automatically build, sign, and release the APK.
