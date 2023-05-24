console.log("welcome to client_new");

var ip="";
var Nth_edge =1;
var edge = 0;
var threshold = .5;
var rp_url="";
var n_event=0;
var n_event_tag = 0;
var single_evt = 0;
var x_at_trigger= 0;
var trig_delay = -1;

function connect() {
    ip = document.getElementById("ip").value;
    rp_url = "http://"+ip;
    console.log("My URL is "+rp_url)
    const Http = new XMLHttpRequest();
    var url = rp_url+':3000/connect';
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
        console.log(Http.responseText)
        document.getElementById("connect_display").innerHTML = Http.responseText;
    }
}




function stop_DAC() {
    document.getElementById("arm_trigger").value = "OFF";
    const url = rp_url+':3001/stop_DAC';
    console.log('STOP DAC sent to server');
        const Http = new XMLHttpRequest();
        Http.open("GET", url);
        Http.send();
}



function arm_trigger() {
        Nth_edge = document.getElementById("Nth_edge").value;   
        edge = document.getElementById("edge").value;   
        threshold = parseFloat(document.getElementById("threshold").value);   
        console.log('ARM TRIGGER sent to server');
    
        n_event+=1;
        n_event_tag = 10*n_event;
        const url1 = rp_url+':3001/arm_trig/'+ n_event + "/" + Nth_edge + "/" +edge + "/" + threshold


        const Http = new XMLHttpRequest();

        Http.open("GET", url1 );
        Http.send();
        Http.onreadystatechange = (e) => {
            var resp = Http.responseText;

            console.log("ARM TRIGGER Server response for event: " + n_event)
            myArray = resp.split(",");
            if (myArray.length > 10) {
            //if (n_event == myArray[0]){
                //n_event_tag += 1;
                //if (n_event_tag == 10*n_event+1) {


            //resp_array = resp.slice(",");
            document.getElementById("data_display_plot").innerHTML = " Number of Points: "+parseInt(myArray.length-3);
            console.log(myArray);
            console.log(myArray.length);
            //console.log(parseFloat(myArray[2].split("[")[1]));
            x_at_trigger = parseInt(myArray[1]);
            console.log("x_at_trigger = " + x_at_trigger)

            X_data = [0];
            Y_data =[parseFloat(myArray[3].split("[")[1])]
            for (var i = 4; i < myArray.length; i++) {
                X_data.push((i-3)*8);
                Y_data.push(parseFloat(myArray[i]));
            }
            console.log("Number of data points =", myArray.length)
            if (myArray.length>10){
                draw();
      }  else {
        document.getElementById("arm_trigger").value ="OFF"
    }

      }
      }     
  }
    











function draw() {
    if (document.getElementById("arm_trigger").value == "SINGLE") {
        document.getElementById("arm_trigger").value ="OFF"
    }
    
    var layout = {
        xaxis: {
            title: "Time (ns)"
        },
        yaxis: {
            title: "Amplitude (mV)"
        },
        shapes: [{
    type: 'line',
    x0: (x_at_trigger-trig_delay)*8,
    y0: 0,
    x1: (x_at_trigger-trig_delay)*8,
    yref: 'paper',
    y1: 1,
    line: {
      color: 'green',
      width: 2,
      dash: 'dot'
    }
  }],
    title: {
            text:"Data Acquired <br> Event: " + n_event,
          font: {
      family: 'Times New Roman',
      size: 24
    },
}
    };
    var data = [{
        x: X_data,
        y: Y_data,
        mode: "lines+markers",
        type: 'line',
        marker: {
            color: 'blue',
            size: 4,
            line: {
                color: 'black',
                width: .2
            }
        },
    }];

    Plotly.newPlot("plot1", data, layout);
    //if (document.getElementById("arm_trigger").value == "NORMAL") {
    //    arm_trigger();
    //}
}



function upload() {
    const code = document.getElementById("code_input_upload").value;
    const Http = new XMLHttpRequest();
    const url = rp_url+':3000/upload?text='+encodeURIComponent(code);
    console.log('UPLOAD WAVE sent to server');

    fetch(url)
        .then(response => {
            response => response.text();
            response => response();
        })
        .then(data => console.log(data))
        .catch(error => {
            console.error('Error with Upload waveform:', error);
        });
}


function start_DAC() {
    const code = document.getElementById("code_input_start_DAC").value;
    //const Http = new XMLHttpRequest();
    const url = rp_url+':3000/start_DAC?text='+encodeURIComponent(code);
    console.log('START DAC sent to server');

    fetch(url)
        .then(response => {
            response => response.text();
            response => response();
        })
        .catch(error => {
            console.error('Error with Start DAC:', error);
        });
}



function save_arm_trigger() {
    const code = document.getElementById("code_input_save").value;
    const url = rp_url+':3000/save?text='+encodeURIComponent(code);
    console.log('SAVE sent to server');

    fetch(url)
        .then(response => {
            response => response.text();
            response => response();
        })
        .catch(error => {
            console.error('Error with Save:', error);
        });
}



function single() {
    if (document.getElementById("arm_trigger").value != "SINGLE") {
        document.getElementById("arm_trigger").value = "SINGLE";

        console.log("Trigger is SINGLE ON ....");
        arm_trigger();
        
        
    }

}

function trigger() {
        document.getElementById("arm_trigger").value = "OFF";
        console.log("Trigger is OFF ....");
}


