const express   = require('express');
const execSync = require('child_process').execSync;
const app    = express();
const cors   = require('cors');
app.use(cors({origin:"*",}))
app.disable('etag');
app.disable('x-powered-by');

app.get('/arm_trig/:event/:Nth_edge/:edge/:threshold',   function (req, res) {

    console.log('ARM_TRIGGER received by server')
    const output = execSync('python3 Arm_Trigger.py ' + req.params.event + " " +req.params.Nth_edge + " " +req.params.edge + " " +req.params.threshold, { encoding: 'utf-8' });
      res.type('text/plain');
      res.send(output);
  });

 app.get('/stop_DAC', function (req, res) {
    console.log('STOP DAC received by server')
    res.type('text/plain');
    res.send("stop_DAC received by server");
    const output4 = execSync('killall python3' , { encoding: 'utf-8' });
});

app.listen(3001, () => {
    console.log('App Server is listening on port 3001');
});
