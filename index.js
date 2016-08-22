const express = require('express');
const useragent = require('useragent');
const accepts = require('accepts');
const requestIp = require('request-ip');
const app = express();

app.use(requestIp.mw())

app.set('port', (process.env.PORT || 5000));
app.get('/', function (request, response) {
    const ua = useragent.parse(request.headers['user-agent']);
    const langs = accepts(request).languages();

    response.json({
        ipaddress: request.clientIp,
        language: langs[0],
        software: ua.os.family,
    });
});

app.listen(app.get('port'), function () {
    console.log('app is running on port', app.get('port'));
});
