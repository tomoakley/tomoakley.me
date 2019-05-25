var https = require('https');

exports.handler = (event, context, callback) => {
    
    var body = JSON.stringify({ text: 'Hello World! Love Lambda' });
    
    var slackRequestOptions = {
        method: 'POST',
        port: 443,
        hostname: 'hooks.slack.com',
        path: '/services/T4B2KKNRK/BK04PP2LQ/UyWckKzvmAqHd31g1Jf9s8sA',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(body)
        }
    };

    var post = https.request(slackRequestOptions, res => {
        res.setEncoding('utf8');
        console.log('Response: ', res);
    }).on('error', function(e) {
        console.log(e);
        callback(e);
    });
    

    post.write(Buffer.from(body));
    post.end();

    var response = {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: 'success'
        })
    };

    callback(null, response);
};