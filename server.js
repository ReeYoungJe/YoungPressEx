// express 모듈을 불러옵니다
const express = require('express');

// express 애플리케이션을 생성합니다
const app = express();

// 서버가 사용할 포트 번호를 설정합니다
const port = 3002;

// src 폴더를 웹사이트의 기본 폴더로 설정
app.use(express.static('src'));

// 미들웨어 설정 영역
// app.use() 를 통해 필요한 미들웨어를 추가할 수 있습니다

// 라우팅 설정 영역 시작
/**
 * 기본 경로('/')에 대한 GET 요청을 처리합니다
 * req: 클라이언트로부터의 요청 객체 (request)
 * res: 클라이언트에게 보낼 응답 객체 (response)
 */
app.get('/', (req, res) => {
  // res.send()를 사용하여 클라이언트에게 응답을 보냅니다
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

/**
 * 서버를 지정된 포트에서 실행합니다
 * 첫 번째 매개변수: 포트 번호
 * 두 번째 매개변수: 서버가 실행될 때 호출될 콜백 함수
 */
app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다`);
});

// 추가 기능을 위한 예시 라우트들:

/**
 * POST 요청 처리 예시
 * app.post('/api/data', (req, res) => {
 *   // POST 요청 처리 로직
 * });
 */

/**
 * 동적 라우트 파라미터 사용 예시
 * app.get('/user/:id', (req, res) => {
 *   const userId = req.params.id;
 *   // userId를 사용한 처리 로직
 * });
 */

/**
 * 에러 처리 미들웨어 예시
 * app.use((err, req, res, next) => {
 *   console.error(err.stack);
 *   res.status(500).send('서버 에러가 발생했습니다!');
 * });
 */