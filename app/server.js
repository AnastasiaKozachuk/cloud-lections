const os = require('os');
const express = require('express');
const app = express();
const redis = require('redis');
const redisClient = redis.createClient({
  host: 'redis',
  port: 6379
});

app.get('/sum', function(req, res) {
    redisClient.get("total_sum", function(err, savedSum) {
        resultSum = parseInt(req.query.value);
        if (!isNaN(savedSum) && savedSum != null) {
            resultSum = resultSum + parseInt(savedSum);
        }

       res.send('Host - ' + os.hostname() +', Total sum: ' + resultSum);
       redisClient.set('total_sum', resultSum);
    });
});

app.listen(5000, function() {
    console.log('Web application is listening on port 5000');
});
