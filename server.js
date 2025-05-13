const express = require('express');
const app = express();
const port = 3002;
const path = require('path');
import ejs from "ejs";

// 미들웨어 함수 - 디버깅 로그 추가
const filterByExtension = (allowedExtensions) => {
    return (req, res, next) => {
        // 디버깅용 로그
        const ext = path.extname(req.path).toLowerCase();
        // 주의: 허용된 확장자일 때 next()로 진행
        if (allowedExtensions.includes(ext)) {
            return next();
        }
        // 허용되지 않은 확장자는 차단
        return res.status(403).send('원하는 확장자 아님');
    };
};

// CSS 폴더 설정
app.use('/css', filterByExtension(['.css']), express.static('src/css'));
// JS 폴더 설정
app.use('/js', filterByExtension(['.js']), express.static('src/js'));
// Pages 폴더 설정
app.use('/page', filterByExtension(['.html', '.ejs']), express.static('src/page'));

app.listen(port, () => {
    console.log(`서버가 포트 ${port}에서 실행 중입니다`);
});