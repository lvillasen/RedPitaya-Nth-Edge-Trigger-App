const express = require('express');
const execSync = require('child_process').execSync;
const app = express();
const cors = require('cors');
app.use(cors({ origin: "*", }))
app.disable('etag');
app.disable('x-powered-by');

app.get('/connect/', function(req, res) {
    console.log('Connected to RedPitaya');
    res.send('Connected to RedPitaya');
});




app.get('/upload', (req, res) => {
    const text = req.query.text;
    console.log('UPLOAD  received by server')
    res.send('UPLOAD received by server')
    const output = execSync(`python3 -c '${text}'`);
});



app.get('/start_DAC', (req, res) => {
    res.send('START DAC received by server');
    const text = req.query.text;
    console.log('START_DAC received by server')
    const output = execSync(`python3 -c '${text}'`);
});

app.get('/save', (req, res) => {
    res.send('SAVE received by server');
    const text = req.query.text;
    console.log('SAVE received by server')
    const output = execSync(`echo '${text}' > Arm_Trigger.py`);
});

app.listen(3000, () => {
    console.log('App Server is listening on port 3000');
});
