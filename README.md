# TundraCast Radio App

A modern radio streaming application built with React Native, supporting both iOS and Android platforms.

## Prerequisites

### For macOS:
- Node.js (v18 or higher)
- Xcode (latest version)
- CocoaPods
- Watchman (recommended)
- Ruby (for CocoaPods)
- Android Studio (for Android development)
- JDK 17 or higher

### For Windows:
- Node.js (v18 or higher)
- Android Studio
- JDK 17 or higher
- Python (for some build tools)
- Visual Studio (for Windows development)

## Installation Steps

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/TundraCastApps.git
cd TundraCastApps
```

### 2. Install Dependencies
```bash
# Install JavaScript dependencies
yarn install

# Install iOS dependencies (macOS only)
cd ios && pod install && cd ..
```

### 3. Environment Setup

#### macOS:
1. Install Xcode from the Mac App Store
2. Install CocoaPods:
   ```bash
   sudo gem install cocoapods
   ```
3. Install Watchman (recommended):
   ```bash
   brew install watchman
   ```
4. Install Android Studio and configure:
   - Download from [Android Studio website](https://developer.android.com/studio)
   - Install Android SDK
   - Set ANDROID_HOME environment variable:
     ```bash
     echo 'export ANDROID_HOME=$HOME/Library/Android/sdk' >> ~/.zshrc
     echo 'export PATH=$PATH:$ANDROID_HOME/tools' >> ~/.zshrc
     echo 'export PATH=$PATH:$ANDROID_HOME/platform-tools' >> ~/.zshrc
     ```

#### Windows:
1. Install Android Studio:
   - Download from [Android Studio website](https://developer.android.com/studio)
   - During installation, select:
     - Android SDK
     - Android SDK Platform
     - Android Virtual Device
2. Set environment variables:
   - ANDROID_HOME: `C:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk`
   - Add to PATH:
     - `%ANDROID_HOME%\platform-tools`
     - `%ANDROID_HOME%\tools`
     - `%ANDROID_HOME%\tools\bin`

### 4. Running the App

#### For iOS (macOS only):
```bash
# Start Metro bundler
yarn start

# In a new terminal, run the iOS app
yarn ios
```

#### For Android:
```bash
# Start Metro bundler
yarn start

# In a new terminal, run the Android app
yarn android
```

### 5. Development Scripts

```bash
# Start the app in development mode
yarn start:development

# Start the app in staging mode
yarn start:staging

# Start the app in production mode
yarn start:production

# Run linting
yarn lint

# Fix linting issues
yarn lint:fix

# Run TypeScript type checking
yarn typescript

# Run tests
yarn test
```

## Troubleshooting

### Common Issues

#### iOS (macOS):
1. Pod install fails:
   ```bash
   cd ios
   pod deintegrate
   pod install
   ```
2. Build fails in Xcode:
   - Clean build folder (Xcode → Product → Clean Build Folder)
   - Delete derived data (Xcode → Preferences → Locations → Derived Data → Delete)

#### Android:
1. Build fails:
   ```bash
   cd android
   ./gradlew clean
   cd ..
   yarn android
   ```
2. Metro bundler issues:
   ```bash
   yarn start --reset-cache
   ```

### Environment-specific Issues

#### macOS:
- If you get permission errors with CocoaPods:
  ```bash
  sudo gem install cocoapods
  ```
- If Xcode command line tools are missing:
  ```bash
  xcode-select --install
  ```

#### Windows:
- If you get SDK location errors:
  - Open Android Studio
  - Go to Settings → Appearance & Behavior → System Settings → Android SDK
  - Copy the Android SDK Location path
  - Set it as ANDROID_HOME environment variable

## Additional Resources

- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [React Navigation Documentation](https://reactnavigation.org/docs/getting-started)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

[Your License Here]
