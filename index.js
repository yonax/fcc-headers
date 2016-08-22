const express = require('express');
const useragent = require('useragent');
const accepts = require('accepts');
const app = express();

app.set('port', (process.env.PORT || 5000));
app.get('/', function (request, response) {
    const ua = useragent.parse(request.headers['user-agent']);
    const langs = accepts(request).languages();

    response.json({
        ipaddress: request.connection.remoteAddress,
        language: langs[0],
        software: ua.os.family,
    });
});

app.listen(app.get('port'), function () {
    console.log('app is running on port', app.get('port'));
});
