const express = require('express');
const app = express();
const port = 3002;
const path = require('path');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');  // 기본 뷰 엔진을 html로 변경
app.set('views', path.join(__dirname, 'src'));

const filterByExtension = (allowedExtensions) => {
    return (req, res, next) => {
        const ext = path.extname(req.path).toLowerCase();
        if (allowedExtensions.includes(ext)) {
            return next();
        }
        return res.status(403).send('원하는 확장자 아님');
    };
};

// CSS와 JS 폴더 설정
app.use('/css', filterByExtension(['.css']), express.static('src/css'));
app.use('/js', filterByExtension(['.js']), express.static('src/js'));
app.use('/scss', filterByExtension(['.scss']), express.static('src/scss'))
// HTML 파일 라우팅 처리
app.get('/*.html', (req, res) => {
    const fileName = path.basename(req.path, '.html');
    res.render(fileName + '.html');
});

// 페이지 라우팅
app.get('/page/*', (req, res) => {
    const filePath = req.path.substring(1);
    res.render(filePath);
});

// 루트 경로 처리
app.get('/', (req, res) => {
    res.render('index.html');
});

// 정적 파일 처리는 마지막에
app.use(express.static('src'));

app.listen(port, () => {
    console.log(`서버가 포트 ${port}에서 실행 중입니다`);
});