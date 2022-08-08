# Mobile

Mobile app code will be used to create a PWA and mobile native versions of the website.

## Building for android

### Requirements
- Node.js ( 18.7.0 or higher )
- pnpm ( 7.9.0 or higher )
- Docker ( 20.10.17 or higher )
- Docker compose ( 1.29.2 or higher )
- android studio

### Building web data
first you need to run the following commands, after all of them completed successfully, then you can open `android` folder inside `mobile` folder, with android studio.
```bash
cd ./mobile
pnpm install # Installing dependencies
pnpm run prisma-types # Generating prisma types
npx cap add android # Generating android app scaffolding with capacitor.js
pnpm run build-android # building web application and setting up android files
```