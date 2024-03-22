const express = require('express');
const Redis = require('ioredis');
const redis = new Redis();

const app = express();


app.get('/', async (req, res) => {
    const a = await redis.get('api');
    if (a) {
        return res.json({
            data: JSON.parse(a)
        })
    }
    const ab = await fetch('https://dummyjson.com/product');
    const json = await ab.json();
    await redis.set('api', JSON.stringify(json))
    res.json({
        data: json
    })
})

app.listen(3000, () => {
    console.log('server is up on 3000')
})
