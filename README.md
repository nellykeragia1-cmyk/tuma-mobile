
# Tuma Mobile (Expo / GitHub Actions → APK)

This repo is prepared so you can get an **Android APK** with **no terminal**.
You only need a GitHub account and an Expo account.

## What you do (click-only)

1. Create a new repo at https://github.com/new named **tuma-mobile**.
2. Upload the contents of this ZIP (drag-and-drop).
3. In GitHub, open `mobile/app.json` and change `"owner": "YOUR_EXPO_USERNAME"` to your actual Expo username.
4. In GitHub, go to **Settings → Secrets and variables → Actions → New repository secret**:
   - Name: `EXPO_TOKEN`
   - Value: your token from https://expo.dev/accounts/{your-username}/settings/access-tokens
5. Go to the **Actions** tab → choose **Build Tuma Mobile (EAS)** → **Run workflow**.
6. After a few minutes, visit https://expo.dev/accounts to download **Tuma.apk** from your builds.

That's it.
