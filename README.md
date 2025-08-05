# Avatar Solution

This is a sample project and was bootstrapped using [NextJS](https://nextjs.org/).
Feel free to play around with the existing code and please leave any feedback for the SDK [here](https://github.com/HeyGen-Official/StreamingAvatarSDK/discussions).

## Features

✅ **Multi-language Support** - Avatar supports Dutch, English, Turkish, Portuguese, and Spanish
✅ **Persistent Language Configuration** - Language stays consistent throughout conversations
✅ **Speech-to-Text Integration** - Voice recognition matches selected language
✅ **Dynamic Language Switching** - Change languages with automatic avatar restart
✅ **Localized UI** - Interface adapts to selected language

## Language Configuration

The avatar is configured with proper language support including:
- Avatar language configuration
- Knowledge base selection per language
- STT (Speech-To-Text) language matching
- Localized introduction messages

### Supported Languages
- English (en)
- Dutch (nl) 
- Turkish (tr)
- Portuguese (pt)
- Spanish (es)

## Getting Started FAQ

### Setting up the demo

1. Clone this repo

2. Navigate to the repo folder in your terminal

3. Run `npm install` (assuming you have npm installed. If not, please follow these instructions: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/)

4. Enter your HeyGen Enterprise API Token in the `.env` file. Replace `HEYGEN_API_KEY` with your API key. This will allow the Client app to generate secure Access Tokens with which to create interactive sessions.

   You can retrieve either the API Key by logging in to HeyGen and navigating to this page in your settings: [https://app.heygen.com/settings?from=&nav=Subscriptions%20%26%20API]. 

5. (Optional) If you would like to use the OpenAI features, enter your OpenAI Api Key in the `.env` file.

6. Run `npm run dev`

### Starting sessions

NOTE: Make sure you have enter your token into the `.env` file and run `npm run dev`.

1. **Select Language**: Choose your preferred language from the dropdown
2. **Start Training**: Click the "Start Training" button to initialize the avatar
3. **Begin Conversation**: The avatar will introduce itself in the selected language
4. **Voice/Text Chat**: Communicate via voice or text - both will stay in the selected language

### Language Switching

If you want to change languages during a session:
1. Select a new language from the dropdown
2. The avatar will automatically restart with the new language configuration
3. All conversation will continue in the newly selected language

### Which Avatars can I use with this project?

By default, there are several Public Avatars that can be used in Interactive Avatar. (AKA Interactive Avatars.) You can find the Avatar IDs for these Public Avatars by navigating to [labs.heygen.com/interactive-avatar](https://labs.heygen.com/interactive-avatar) and clicking 'Select Avatar' and copying the avatar id.

You can create your own custom Interactive Avatars at labs.heygen.com/interactive-avatar by clicking 'create interactive avatar' on the top-left of the screen.

### Technical Implementation

The language configuration ensures:
- Proper avatar session initialization with selected language
- STT language matching for accurate voice recognition  
- Correct knowledge base selection per language
- Automatic language synchronization across restarts

### Where can I read more about enterprise-level usage of the Interactive Avatar API?

Please read our Interactive Avatar 101 article for more information on pricing: https://help.heygen.com/en/articles/9182113-interactive-avatar-101-your-ultimate-guide
