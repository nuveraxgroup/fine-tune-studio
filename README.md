## Fine-tune Studio

This is an open source UI Interface for fine-tuning.

> Implementation still in process and initially will work only for OpenAI fine-tuning.

### How to run backend
1. Install packages
```shell
cd ./backend/typescript
npm install
```
2. Create environment variables, create file `.env.local`
```dotenv
PORT=3000
BASE_PREFIX=/api
OPENAI_API_KEY={YOUR_OPENAI_TOKEN}
```
3. Run Backend
```shell
npm run start
```
### How to run frontend
1. Install packages
```shell
cd ./frontend/studio
npm install
```
2. Create environment variables, create file `.env.local`
```dotenv
VITE_BACKEND_URL=http://localhost:3000/api
VITE_ENV=LOCAL
```
3. Run Frontend
```shell
npm run start
```