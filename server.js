const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.static('.'));
app.use(express.json());

app.get('/', (_, res) => res.sendFile(__dirname + '/index.html'));

// Books API
app.get('/books', (_, res) => {
  fs.readFile(__dirname + '/books.json', (err, data) => {
    if (err) return res.status(500).send([]);
    res.json(JSON.parse(data));
  });
});

// Checkout API
app.post('/checkout', (req,res) => {
  fs.readFile(__dirname + '/orders.json', (err, content) => {
    let orders = [];
    try { orders = JSON.parse(content); } catch {}
    orders.push({...req.body, date: new Date().toISOString()});
    fs.writeFile(__dirname + '/orders.json', JSON.stringify(orders,null,2), ()=> {});
    res.json({status:'ok'});
  });
});

// Book Swap API
app.post('/swap', (req, res) => {
  fs.readFile(__dirname + '/swaps.json', (err, content) => {
    let swaps = [];
    try { swaps = JSON.parse(content); } catch {}
    swaps.push({...req.body, date: new Date().toISOString()});
    fs.writeFile(__dirname + '/swaps.json', JSON.stringify(swaps,null,2), () => {});
    res.json({status:'ok'});
  });
});
app.get('/swaps', (_, res) => {
  fs.readFile(__dirname + '/swaps.json', (err, content) => {
    let swaps = [];
    try { swaps = JSON.parse(content); } catch {}
    res.json(swaps || []);
  });
});

app.listen(PORT, () => console.log(`BookVerse server running at http://localhost:${PORT}`));
