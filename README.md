# Game Pocket Tanks
### [Open the game](https://pocketanks.westeurope.cloudapp.azure.com)

## Design
### [Open in Figma](https://www.figma.com/file/VQfJFBznJXtKE6i0qTMfLe/Layout?node-id=0%3A1)

## Pre-Requisites
Make sure you have docker and docker-compose installed.

Create environment files at stage/env/dev.env and deploy_files/env/prod.env .
You can use stage/dev.env.example file as an example.
For Google OAuth and Yandex OAuth to work you need to set this env variables with values 
given after registering app in Google and Yandex: 
- GOOGLE_CLIENT_ID 
- GOOGLE_CLIENT_SECRET
- YANDEX_CLIENT_ID
- YANDEX_CLIENT_SECRET

## Installation
<a name="install"></a>
<a name="installstart"></a>
```sh
npm install
```

```sh
npm run docker:stage
```

The game will be launched at https://localhost:5000

## Testing + Linting
<a name="install"></a>
<a name="installstart"></a>
```sh
npm run validate
```

## Testing
<a name="install"></a>
<a name="installstart"></a>
```sh
npm run test
```


## Linting
<a name="install"></a>
<a name="installstart"></a>
```sh
npm run lint:all
```

## Developers
<a name="developers"></a>

- [Kirill Kalinin](https://github.com/kirill-kalinin)
- [Dmitriy Lyapin](https://github.com/Pelmenya)
- [Andrey Korotayev](https://github.com/a-k-kord)
