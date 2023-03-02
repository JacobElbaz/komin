
# Komin (frontend)

This is a native app, it's a social network for posting and chatting with other users. 

Link to the backend: https://github.com/JacobElbaz/WebTech.git


## Screenshots
<p float="left">
<img src="https://user-images.githubusercontent.com/73593531/222480774-d34e6d1c-e26c-49bc-adfe-8bdc99e0c82a.jpg" height="400">
<img src="https://user-images.githubusercontent.com/73593531/222480807-59b72cc2-64f1-4862-8a35-b042ee59f8a5.jpg" height="400">
<img src="https://user-images.githubusercontent.com/73593531/222480839-459957aa-f9d2-4724-b21c-ade210831383.jpg" height="400">
<img src="https://user-images.githubusercontent.com/73593531/222480929-37528732-eab7-4e4d-b66d-741f3242d819.jpg" height="400">
<img src="https://user-images.githubusercontent.com/73593531/222480944-b056d4fb-c255-4b5f-a521-523c5f30d699.jpg" height="400">
<img src="https://user-images.githubusercontent.com/73593531/222480976-4d840de4-11a4-4e0f-835b-fcc65f526502.jpg" height="400">
<img src="https://user-images.githubusercontent.com/73593531/222480989-dde26e1a-c2f2-4a23-b34c-45dafb484bee.jpg" height="400">
<img src="https://user-images.githubusercontent.com/73593531/222481006-91d6fc5c-8a8a-4f9e-9faa-ee1490920170.jpg" height="400">
</p>

## Tech Stack

**Client:** React Native, TypeScript, React Navigation, AsyncStorage, Expo Image Picker.

**Server:** Node, Express, Mongo, jest, multer, swagger, socket.io


## Features


- Login
- Register
- Post 
- Edit post 
- Delete post
- Feed
- Profile
- Edit profile
- Chat

## Environment Variables
### Server side 
To run this project, you will need to add the following environment variables to your .env file

`PORT` = 3000

`DATABASE_URL` = *your mongo uri*

`ACCESS_TOKEN_SECRET` = fjhbsi879483nlwes9rolfg980348ndsjnfgdfvjndfgiyrf789ernlerg9

`JWT_TOKEN_EXPIRATION` = 3600s

`REFRESH_TOKEN_SECRET` = kjfdbgpr8fhj094j9jgkmdgzgfboknmgbnlkjtgnhitrobt

`NODE_ENV` = development

`IP` = *your current IP (you can run `ipconfig` to know him)*

### Client side
To run this project, you will need to add the following environment variables to your ip.tsx file

`IP` = *your current IP (you can run `ipconfig` to know him)*

## Run Locally

### Server side
Clone the backend project 

```bash
  git clone https://github.com/JacobElbaz/WebTech.git
```

Go to the project directory

```bash
  cd WebTech
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```
### Client side
Clone the frontend project 

```bash
  git clone https://github.com/JacobElbaz/komin.git
```

Go to the project directory

```bash
  cd komin
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

