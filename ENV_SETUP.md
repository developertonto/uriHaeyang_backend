# 백엔드 환경변수 설정 가이드

## 문제 해결

에러 메시지가 나왔다면, `server/.env` 파일이 없거나 `OPENAI_API_KEY`가 설정되지 않았기 때문입니다.

## 설정 방법

### 1. `.env` 파일 생성

`server/` 디렉토리에 `.env` 파일을 생성하세요.

### 2. 환경변수 추가

`.env` 파일에 다음 내용을 추가하세요:

```env
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001
FRONTEND_URL=http://localhost:3000
```

### 3. OpenAI API 키 설정

**프론트엔드의 `.env` 파일에 `VITE_OPENAI_API_KEY`가 있다면**, 같은 키를 사용하세요:

```env
OPENAI_API_KEY=sk-...  # 프론트엔드 .env의 VITE_OPENAI_API_KEY 값과 동일
PORT=3001
FRONTEND_URL=http://localhost:3000
```

## 파일 위치

```
urihaeyang-main/
├── .env                    # 프론트엔드 환경변수 (VITE_OPENAI_API_KEY)
└── server/
    └── .env                # 백엔드 환경변수 (OPENAI_API_KEY) ⭐ 여기에 생성!
```

## 주의사항

- `.env` 파일은 `.gitignore`에 포함되어 있어 Git에 커밋되지 않습니다.
- API 키는 절대 공개되지 않도록 주의하세요.
- 프론트엔드와 백엔드는 **같은 OpenAI API 키**를 사용합니다.

## 예시

프론트엔드 `.env`:
```env
VITE_OPENAI_API_KEY=sk-proj-abc123...
VITE_WEATHER_API_KEY=weather_key...
```

백엔드 `server/.env`:
```env
OPENAI_API_KEY=sk-proj-abc123...  # 같은 키!
PORT=3001
FRONTEND_URL=http://localhost:3000
```

## 확인 방법

`.env` 파일을 생성한 후, 백엔드 서버를 재시작하세요:

```bash
cd server
npm run dev
```

"✅ OpenAI API 키가 설정되었습니다." 메시지가 나오면 성공입니다!

