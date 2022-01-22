# gamsung-routine-front
테스크 템플릿을 제공하여 루틴을 쉽게 생성할 수 있도록 도와주고  친구와 테스크를 공유하여 성취감을 얻는 루틴 메이커 서비스

## how to install

1. yarn install
2. brew install cocoapods
3. cd ios
4. pod install

### android start
yarn run android

### ios start
yarn run ios



## Error Solution

### xcodebuild error
```
Failed to build iOS project. We ran "xcodebuild" command but it exited with error code 65. To debug build logs further, consider building your app with Xcode.app, by opening routine.xcworkspace.
```
`brew install cocoapods` and `pod install`

### simulator code error
```
Failed to launch the app on simulator, An error was encountered processing the command (domain=com.apple.CoreSimulator.SimError, code=405):
```
Close the opened simulator and yarn run ios.
