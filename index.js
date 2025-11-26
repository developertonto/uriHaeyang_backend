import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

// 환경변수 로드
dotenv.config();

// 환경변수 검증
const apiKey = process.env.OPENAI_API_KEY?.trim();

if (!apiKey) {
  console.error('❌ 오류: OPENAI_API_KEY 환경변수가 설정되지 않았습니다!');
  console.error('');
  console.error('📝 해결방법:');
  console.error('   1. server/.env 파일을 생성하세요');
  console.error('   2. 다음 내용을 추가하세요:');
  console.error('      OPENAI_API_KEY=your_openai_api_key_here');
  console.error('      PORT=3001');
  console.error('      FRONTEND_URL=http://localhost:3000');
  console.error('');
  console.error('💡 프론트엔드의 .env에 VITE_OPENAI_API_KEY가 있다면, 같은 키를 사용하세요.');
  process.exit(1);
}

// API 키 형식 기본 검증 (선택사항)
if (!apiKey.startsWith('sk-')) {
  console.warn('⚠️  경고: API 키가 일반적인 OpenAI 형식(sk-...)이 아닙니다.');
  console.warn('   API 키가 올바른지 확인해주세요: https://platform.openai.com/account/api-keys');
}

const app = express();
const PORT = process.env.PORT || 3001;

// 미들웨어 설정
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// OpenAI 클라이언트 초기화
const openai = new OpenAI({
  apiKey: apiKey
});

console.log('✅ OpenAI API 키가 설정되었습니다.');

// OpenAI API를 호출하는 엔드포인트
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ 
        error: 'messages 배열이 필요합니다.' 
      });
    }

    // 시스템 메시지 추가
    const systemMessage = {
      role: 'system',
      content: `당신은 해양 전문 AI 어시스턴트입니다. 해양 기상, 해상 안전, 해양 환경, 해양 생물 등 해양 관련 질문에 대해 정확하고 도움이 되는 답변을 제공해주세요. 한국어로 답변해주세요.`
    };

    // 시스템 메시지가 없으면 추가
    const chatMessages = messages.some(msg => msg.role === 'system') 
      ? messages 
      : [systemMessage, ...messages];

    // OpenAI API 호출
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: chatMessages,
      max_tokens: 1000,
      temperature: 0.7
    });

    if (completion.choices && completion.choices.length > 0) {
      const responseMessage = completion.choices[0].message.content;
      
      res.json({
        success: true,
        message: responseMessage
      });
    } else {
      throw new Error('API 응답 형식이 올바르지 않습니다.');
    }

  } catch (error) {
    console.error('OpenAI API 호출 오류:', error);

    // OpenAI API 에러 처리 (OpenAI SDK 에러 형식)
    if (error.status) {
      const status = error.status;
      const errorCode = error.code || error.error?.code;
      const errorMessage = error.message || error.error?.message;

      if (status === 401) {
        console.error('❌ API 키 인증 실패');
        console.error('💡 해결방법:');
        console.error('   1. server/.env 파일의 OPENAI_API_KEY를 확인하세요');
        console.error('   2. API 키가 올바른지 확인: https://platform.openai.com/account/api-keys');
        console.error('   3. 프론트엔드의 VITE_OPENAI_API_KEY와 동일한 값인지 확인하세요');
        console.error('   4. API 키에 공백이나 따옴표가 포함되지 않았는지 확인하세요');
        
        return res.status(401).json({ 
          error: 'API 키가 유효하지 않습니다. server/.env 파일의 OPENAI_API_KEY를 확인해주세요.',
          details: 'Incorrect API key provided. Please check your OPENAI_API_KEY in server/.env'
        });
      } else if (status === 429) {
        return res.status(429).json({ 
          error: 'API 사용량이 초과되었습니다. 잠시 후 다시 시도해주세요.',
          details: errorMessage
        });
      } else if (status === 500 || status === 502 || status === 503) {
        return res.status(503).json({ 
          error: 'OpenAI 서비스에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
          details: errorMessage
        });
      } else {
        return res.status(status || 500).json({ 
          error: 'OpenAI API 호출 중 오류가 발생했습니다.',
          details: errorMessage || 'Unknown error'
        });
      }
    }

    // 네트워크 에러 등 기타 에러
    console.error('기타 오류:', error.message);
    res.status(500).json({ 
      error: '서버 오류가 발생했습니다.',
      details: error.message || 'Unknown error'
    });
  }
});

// 헬스체크 엔드포인트
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: '서버가 정상적으로 동작 중입니다.' 
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 서버가 포트 ${PORT}에서 실행 중입니다.`);
  console.log(`📍 프론트엔드: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});

