# GitHub Actions CI/CD Setup

This workflow automatically builds an APK and creates a GitHub release when you push to the main branch.

## Setup Instructions

### 1. Generate Android Signing Key

First, create a keystore for signing your APK:

```bash
keytool -genkeypair -v -storetype PKCS12 -keystore skillup-release.keystore -alias skillup-key -keyalg RSA -keysize 2048 -validity 10000
```

Follow the prompts to set passwords and certificate information.

### 2. Convert Keystore to Base64

```bash
# On Windows PowerShell:
[Convert]::ToBase64String([IO.File]::ReadAllBytes("skillup-release.keystore")) | Out-File -Encoding ASCII keystore.txt

# On macOS/Linux:
base64 -i skillup-release.keystore -o keystore.txt
```

### 3. Add GitHub Secrets

Go to your GitHub repository → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Add these secrets:

- **`EXPO_TOKEN`**: Your Expo access token (get from `npx expo login` then `npx expo whoami --json`)
- **`ANDROID_SIGNING_KEY`**: The base64 content from `keystore.txt`
- **`ANDROID_KEY_ALIAS`**: The alias you used (e.g., `skillup-key`)
- **`ANDROID_KEYSTORE_PASSWORD`**: The keystore password you set
- **`ANDROID_KEY_PASSWORD`**: The key password you set

### 4. Update Version and Release

To trigger a new build and release:

1. Update version in `package.json`:
   ```json
   "version": "1.0.1"
   ```

2. Commit and push to main:
   ```bash
   git add package.json
   git commit -m "Bump version to 1.0.1"
   git push origin main
   ```

Or create a git tag:
   ```bash
   git tag v1.0.1
   git push origin v1.0.1
   ```

The workflow will automatically:
- Build the APK
- Sign it with your keystore
- Create a GitHub release with the APK attached

## Manual Trigger

You can also manually trigger the workflow from GitHub:
- Go to **Actions** → **Build and Release APK** → **Run workflow**

## Workflow Features

✅ Automatic APK building on push to main
✅ Version extraction from package.json
✅ APK signing for production
✅ GitHub release creation
✅ Artifact upload for every build
✅ Manual workflow dispatch option
