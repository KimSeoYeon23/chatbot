# 🤖 Chatbot

Google Gemini AI 기반 챗봇 프론트엔드 애플리케이션입니다.

## 📋 개요

React.js로 구현된 AI 챗봇 UI로, 실시간 스트리밍 응답과 Markdown 렌더링을 지원합니다.

## 🛠 기술 스택

| 구분 | 기술 |
|------|------|
| Framework | React 19 |
| Build Tool | Vite 7 |
| HTTP Client | Axios |
| Markdown | Unified + Remark + Rehype |
| Styling | SCSS (Sass) |

## 📁 프로젝트 구조

```
chatbot/
├── src/
│   ├── api/
│   │   └── Chatbot/
│   │       └── index.js        # API 호출 함수
│   ├── assets/
│   │   ├── images/             # 아이콘 이미지
│   │   └── styles/             # SCSS 스타일
│   ├── components/
│   │   ├── Chatbot.jsx         # 챗봇 메인 컴포넌트
│   │   └── MarkdownRenderer.jsx # Markdown 렌더링
│   ├── libs/
│   │   └── constants.js        # 상수 정의
│   ├── utils/
│   │   └── parse.js            # 데이터 파싱 유틸
│   ├── App.jsx                 # 메인 앱 컴포넌트
│   └── index.jsx               # 엔트리 포인트
├── public/
└── package.json
```

## ⚙️ 설치 및 실행

### 1. 저장소 클론

```bash
git clone https://github.com/KimSeoYeon23/chatbot.git
cd chatbot
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정 (선택)

필요시 `.env` 파일을 생성하여 API 서버 주소를 설정합니다:

```env
VITE_API_URL=http://localhost:3000
```

### 4. 개발 서버 실행

```bash
pnpm run dev
```

브라우저에서 `http://localhost:5173`으로 접속합니다.

### 5. 프로덕션 빌드

```bash
pnpm run build
```

### 6. 빌드 미리보기

```bash
pnpm run preview
```

## 🖥 주요 기능

### 1. 채팅 인터페이스
- 직관적인 채팅 UI
- 메시지 입력 및 전송
- 대화 내역 표시

### 2. AI 모델 선택
- `gemini-3-pro-preview` - 최신 프리뷰 모델
- `gemini-2.5-pro` - 기본 모델
- `gemini-2.5-flash` - 빠른 응답 모델

### 3. 실시간 스트리밍
- AI 응답을 실시간으로 수신
- 타이핑 효과로 자연스러운 UX

### 4. Markdown 렌더링
- unified + remark + rehype 파이프라인
- GFM(GitHub Flavored Markdown) 지원
- 코드 블록, 테이블, 체크리스트 등 지원

### 5. 새 채팅 시작
- 대화 초기화 기능
- 새로운 세션 시작


## 🔗 관련 프로젝트

- [chatbot-api](https://github.com/KimSeoYeon23/chatbot-api) - Node.js 백엔드 API

## 📦 주요 의존성

```json
{
  "react": "^19.2.0",
  "axios": "^1.13.2",
  "unified": "^11.0.5",
  "remark-parse": "^11.0.0",
  "remark-gfm": "^4.0.1",
  "remark-rehype": "^11.1.2",
  "rehype-stringify": "^10.0.1",
  "sass": "^1.94.2",
  "vite": "^7.2.6"
}
```

## 📄 라이선스

MIT License

## 👤 Author

**KimSeoYeon23**

- GitHub: [@KimSeoYeon23](https://github.com/KimSeoYeon23)
