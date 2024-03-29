// CORS => 같은 서버가 아니면 연동이 안됨
// proxy를 설정하면 해결됨, 단, android등은 CORS를 반드시 설정해야 함

module.exports = {
    devServer:{
        proxy : {
            // socket.io, websocket => 문자나 파일을 통신
            // webrtc => 실기간 화상채팅
            '/socket' : {
                target:'http://localhost:3001',
                changeOrigin :true,
                logLevel : 'debug'
            },
            '/member' : {//rest
                target:'http://localhost:3000',
                changeOrigin :true,
                logLevel : 'debug'
            },
            '/item' : {//rest
                target:'http://localhost:3000',
                changeOrigin :true,
                logLevel : 'debug'
            },
        },
    }
}