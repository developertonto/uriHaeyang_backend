# ⚠️ 환경변수 설정 필요!

백엔드 서버를 실행하려면 `server/.env` 파일이 필요합니다.

## 빠른 설정 (3단계)

### 1단계: 파일 생성
`server/` 디렉토리에 `.env` 파일을 생성하세요.

### 2단계: 내용 추가
`.env` 파일에 다음 내용을 추가하세요 (프론트엔드 `.env`의 `VITE_OPENAI_API_KEY` 값 사용):

```env
OPENAI_API_KEY=여기에_프론트엔드의_VITE_OPENAI_API_KEY_값_입력
PORT=3001
FRONTEND_URL=http://localhost:3000
```

### 3단계: 예시
프론트엔드 `.env` 파일에 다음과 같이 있다면:
```
VITE_OPENAI_API_KEY=sk-proj-abc123xyz...
```

백엔드 `server/.env` 파일에는 다음과 같이 작성:
```
OPENAI_API_KEY=sk-proj-abc123xyz...
PORT=3001
FRONTEND_URL=http://localhost:3000
```

## 완료 후
서버를 재시작하면 정상 작동합니다!

```bash
npm run dev
```

