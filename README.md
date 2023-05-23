# RedPitaya Generate Acquire App
Web app to control the Red Pitaya board using Node.js which is a back-end JavaScript runtime environment to 
generate arbitrary signals with the fast DACs and acquire signals with the fast ADCs.


## Requisites

This project assumes the official ecosystem of the Red Pitaya is already installed and in addition it requires the installation of node.js,  express and cors on the Red Pitaya.

I used the following commands to install them:

    wget https://nodejs.org/dist/v17.9.1/node-v17.9.1-linux-armv7l.tar.gz
    tar -xvf node-v17.9.1-linux-armv7l.tar.gz
    cd node-v17.9.1-linux-armv7l 
    cp -R * /usr/local/
    npm install express
    npm install cors
    
 It also requires the Python Periphery module installed on the RedPitaya
 
    pip install python-periphery 
    

Finally, it uses the bitstream file 4.DAC-ADC.bit described in https://github.com/lvillasen/RedPitaya-Hello-World


## Usage

Clone the repository
    
Copy the files 4.DAC-ADC.bit, server_3000.js, server_3001.js and start.sh to any folder of the Red Pitaya board
    
On a Red Pitaya terminal cd to that folder and type:


    cat 4.DAC-ADC.bit > /dev/xdevcfg

    chmod a+x start.sh
    ./start.sh

    
Open the file index.html with any browser and type the IP or rp-xxxxxx.local address of your RedPitaya Board
    
Connect ADC1 to DAC1 and follow the instruccions on the web page

Reboot the RedPitaya board or *cat fpga_0.94.bit > /dev/xdevcfg* to reinstall the official bitstream on the Zynq FPGA.

## Web Page

https://ciiec.buap.mx/RedPitaya-Nth-Edge-Trigger-App

## Credits

This app make extensive use of the Python module called Periphery: https://github.com/vsergeev/python-periphery
    
## License

[MIT](LICENSE)
