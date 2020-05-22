# es-localserver
share a directory with all of it's files and sub-directoies in your local network.

Using this software, you can easily select a directory and share it with users on the same network.

# Download 

Linux ( <3 ) : [Download AppImage](https://github.com/thel0ner/es-localserver/releases/download/1.0.0/linux-es-localserver-1.0.0.AppImage)

Windows the useless : [Download .exe setup](https://github.com/thel0ner/es-localserver/releases/download/1.0.0/windows-es-localserver.Setup.1.0.0.exe)

# scrreenshots : 

![alt text](https://raw.githubusercontent.com/thel0ner/es-localserver/master/demo/Screenshot%20from%202020-05-22%2016-28-19.png)

![alt text](https://raw.githubusercontent.com/thel0ner/es-localserver/master/demo/Screenshot%20from%202020-05-22%2016-28-25.png)

![alt text](https://raw.githubusercontent.com/thel0ner/es-localserver/master/demo/Screenshot%20from%202020-05-22%2016-28-49.png)


![alt text](https://raw.githubusercontent.com/thel0ner/es-localserver/master/demo/Screenshot%20from%202020-05-22%2016-28-57.png)

![alt text](https://raw.githubusercontent.com/thel0ner/es-localserver/master/demo/Screenshot%20from%202020-05-22%2016-36-33.png)

![alt text](https://raw.githubusercontent.com/thel0ner/es-localserver/master/demo/Screenshot%20from%202020-05-22%2016-36-56.png)

# For building : 

`git clone https://github.com/thel0ner/es-localserver.git `

`cd es-localserver`

`yarn add`

`yarn dist`

the above last command will build a package based on your OS. If you just want to check the app, run the following command : 

`yarn start`

Building for other Operating Systems :

For linux : `yarn dist --linux --x64 ` and for ia32 `yarn dist --linux --ia32`

For Windows : `yarn dist --win --x64 ` and for ia32 `yarn dist --win --ia32`

For Mac  : `yarn dist --mac`

Donation? Wow! Please send TRX to : TA7jZQ48wQC8BuWUaoLMuJGaLgQFXnmzbZ
