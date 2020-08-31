const logsemts = require('../build/Logger');
const ch = require('chalk');

const http = require('http');
http.createServer((req, res) => {
    if (req.method === 'POST') {
        let body = '';
				req.on('readable', function () {
					body += req.read() || '';
				});
        req.on('end', function() {
            logsemts.ChalkLogger(ch)(...logsemts.deserialize(body))
            res.write("OK");
            res.end();
        });
    }
}).listen(8080);

const clientLogger = new logsemts.default({loggers: [logsemts.WebhookLogger({address: 'http://localhost:8080'})]});

setInterval(() => clientLogger.getComponentLogger('External').info('Test'), 3000);
setInterval(() => clientLogger.getComponentLogger('External').success('A success'), 4560);
