# API 키 오류 해결 가이드

## 401 오류: "Incorrect API key provided"

### 문제 원인

1. **API 키가 잘못됨** - 가장 흔한 원인
2. **API 키 형식이 잘못됨** - 공백, 따옴표 포함 등
3. **API 키가 만료됨**
4. **잘못된 API 키 타입 사용** - 프로젝트 키 vs 일반 API 키

### 해결 방법

#### 1. API 키 확인

OpenAI 플랫폼에서 올바른 API 키를 확인하세요:
👉 https://platform.openai.com/account/api-keys

**올바른 API 키 형식:**
- `sk-`로 시작
- 예: `sk-proj-abc123...` 또는 `sk-abc123...`

#### 2. 환경변수 파일 확인

`server/.env` 파일을 열어서 확인:

```env
OPENAI_API_KEY=sk-여기에_올바른_API_키_입력
PORT=3001
FRONTEND_URL=http://localhost:3000
```

**주의사항:**
- ✅ 값만 입력 (따옴표 없이)
- ✅ 앞뒤 공백 없이
- ❌ `OPENAI_API_KEY="sk-..."` (따옴표 사용 금지)
- ❌ `OPENAI_API_KEY= sk-...` (공백 사용 금지)

#### 3. 올바른 예시

```env
# ✅ 올바른 형식
OPENAI_API_KEY=sk-proj-abc123xyz456...

# ❌ 잘못된 형식
OPENAI_API_KEY="sk-proj-abc123xyz456..."  # 따옴표 사용
OPENAI_API_KEY=sk-proj-abc123xyz456...    # 공백 포함
OPENAI_API_KEY = sk-proj-abc123xyz456...  # 등호 주변 공백
```

#### 4. 프론트엔드와 백엔드 키 확인

프론트엔드의 `.env` 파일:
```env
VITE_OPENAI_API_KEY=sk-proj-abc123xyz456...
```

백엔드의 `server/.env` 파일:
```env
OPENAI_API_KEY=sk-proj-abc123xyz456...  # 같은 값!
```

**중요:** 프론트엔드와 백엔드는 **정확히 같은 API 키**를 사용해야 합니다.

#### 5. 새 API 키 생성

기존 키가 작동하지 않으면 새 키를 생성하세요:

1. https://platform.openai.com/account/api-keys 접속
2. "Create new secret key" 클릭
3. 생성된 키를 복사 (한 번만 표시됨!)
4. `server/.env` 파일에 붙여넣기
5. 서버 재시작

#### 6. 서버 재시작

환경변수를 변경한 후에는 **반드시 서버를 재시작**해야 합니다:

```bash
# 서버 중지 (Ctrl + C)
# 그 다음 다시 시작
npm run dev
```

### 체크리스트

다음을 순서대로 확인하세요:

- [ ] `server/.env` 파일이 존재하는가?
- [ ] `OPENAI_API_KEY=` 뒤에 값이 있는가?
- [ ] API 키가 `sk-`로 시작하는가?
- [ ] API 키에 따옴표나 공백이 없는가?
- [ ] 프론트엔드와 백엔드의 API 키가 동일한가?
- [ ] 환경변수 변경 후 서버를 재시작했는가?
- [ ] OpenAI 플랫폼에서 API 키가 활성화되어 있는가?

### 여전히 문제가 있다면?

1. **API 키가 유효한지 확인**
   - OpenAI 플랫폼에서 API 키 상태 확인
   - API 키가 만료되지 않았는지 확인

2. **API 키 타입 확인**
   - 일반 API 키 사용 권장
   - 프로젝트 키는 특정 조건에서만 작동

3. **계정 상태 확인**
   - OpenAI 계정에 결제 수단이 등록되어 있는지
   - API 사용 제한이 걸려있지 않은지

### 에러 메시지 예시

```
❌ Incorrect API key provided: sk-proj-****
✅ 올바른 API 키로 교체 필요
```

이 메시지가 나오면 위의 체크리스트를 따라 확인하세요!

