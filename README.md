# psylab
### Python server tools for psychophysics experiments
#### Christopher Brown & Kutay B. Sezginel

-------------------------------------------------------------------------------------------

- Directory:

FlaskApp/FlaskApp/. . .
                  static                 --> static files served on server(.js files, images)
                  templates              --> html files
                  html_server.py         --> Flask server methods
                  get_client_response.py --> Script to tun server and get response

-------------------------------------------------------------------------------------------

- Server Side:

Run `python get_client_response.py` to load http server and listen for client input.

The server runs on 0.0.0.0:5000 by default so in order to connect to the server
the client must enter the static ip address of the the server and port number 5000.

For example: 192.168.1.103:5000 would point to main page.

             192.168.1.103:5000/Localization would point to templates/Localization.html

To get the ip address of the server use 'ifconfig' in terminal and check
inet entry for the ethernet or wireless connection.

If there is error connecting to the server the server might not be accepting connections.

1. Check the output of below to see if server is listening:
   >>> `netstat -tupln | grep ':5000'`

2. If the server is listening allow the trafic using iptables:
   >>> `iptables -I INPUT -p tcp --dport 5000 -j ACCEPT`

*** If the Flask server is not externally visible you can make the server visible
by using `app.run(host='0.0.0.0')` in the python script. Use this option only
if you trust the machines in your network.

-------------------------------------------------------------------------------------------

- Client Side:

As the server is running client can see the html files by typing the address
in following format:

https://server_ip:port_number/html_name

- server_ip: to get server ip use `ifconfig` in terminal window of  server machine

- port_number: defaults to 5000. To use another port change the Flask script:
               >>> `app.run(host='0.0.0.0', port=port_number)`

- html_name: name of the html file to load (without the file extension)
-------------------------------------------------------------------------------------------

- Localization.html:

Should be kept open all times in the client side.

When server is down the ajax requests will not go through.

It might be a good idea to alert user that the server is not ready for receiving inputs.

 - Send alert message (pop up window)

 - Change speaker box colors and add label
