'use strict';

var audioContext = window.webkitAudioContext ? new window.webkitAudioContext() :
                   AudioContext ? new AudioContext() :
                   window.audioContext ? new window.audioContext() :
                   window.AudioContext ? new window.AudioContext() :
                   undefined;


var getUserMedia = navigator.getUserMedia ? 'getUserMedia' :
                       navigator.webkitGetUserMedia ? 'webkitGetUserMedia' :
                       navigator.mozGetUserMedia ? 'mozGetUserMedia' :
                       undefined;
var audioMerger = null;
var audioInput = null;
var pNode = null;
var rxAudio = null;

var AudioModule = null;
var processedBuffer = 0;
var floatBuffer = 0;
var FRAME_SIZE = 1024;

var AudioClient = (function() {
    
    var BUFFER_LENGTH = FRAME_SIZE;
    var zerobuf = [];
    var i;
    var ws_host = "ws://";
    if (window.location.protocol === "https:") {
        ws_host = "wss://";
    }


    for(i=0;i<BUFFER_LENGTH;i++) {
        zerobuf.push(0.0);
    }
    var ClientAudio = function (host, callback) {
        console.log("Sample Rate = ", audioContext.sampleRate,"host =", host);
        var self = this;
        this.ws_host = ws_host + host;
        this.playing = false;
        this.rxBuffer = [];
        this.ptt = false;
        this.callback = callback;
        this.audioRouteSet = false;
        this.websocket = new WebSocket(this.ws_host+'/');
        this.websocket.onopen = function() {
            console.debug('audio websocket established on ', self.ws_host + "/");
        };
        this.websocket.onmessage = function(req) {
            if (self.audioRouteSet) {
                var fbuf = new Float32Array(req.data);
                var i;
                for(i=0; i<fbuf.length; i++) {
                    self.rxBuffer.push(fbuf[i]);
                }
            } else {
                var data = JSON.parse(req.data);
                if (data.port) {
                    self.callback(data, audioContext.sampleRate);
                    self.audioRouteSet = true;
                }
            }
        };
        this.websocket.onclose = function() {
            console.log("audio websocket closed");
          //clearInterval(that.heartbeat);
        };
        this.websocket.onerror = function(e) {
          console.log('audio websocket connection error.');
          console.log(e);
        };
        
    };
    ClientAudio.prototype = {
        start : function (port, clientId) {
            var self = this;
            this.websocket.binaryType = 'arraybuffer';
            //Mixer to link mic audio and incoming audio from socket
            audioMerger = audioContext.createChannelMerger();
            var outputBuffer = new Float32Array(BUFFER_LENGTH);
            navigator[getUserMedia]( {audio:true}, function (stream) {
                audioInput = audioContext.createMediaStreamSource(stream);
                //Grab audio from mic and send it to server;
                pNode = audioContext.createScriptProcessor(BUFFER_LENGTH,1,1);
                pNode.onaudioprocess = function (event) {
                    var buffer;
                    if (!self.ptt) {return;}
                    buffer = event.inputBuffer.getChannelData(0);
                    
                    // Perform acoustic echo cancellation using native client
                    // and Speex echo canceller API
                    var nearBuffer = buffer;
                    var farBuffer = new Float32Array(rbuf);
                    var processBuffer = {'near_end':nearBuffer.buffer, 'far_end':farBuffer.buffer};

                    if(AudioModule && self.playing && document.getElementById('echo_toggle').checked){
                        AudioModule.postMessage(processBuffer);
                        if(floatBuffer === 0){
                            outputBuffer.set(buffer);
                        }
                        else{
                            outputBuffer.set(floatBuffer);
                        }
                    }
                    else{
                        if(floatBuffer !== 0){
                            floatBuffer = 0;
                            
                            // Do we need to reset the echo canceller filter every time?
                            if(AudioModule)
                                AudioModule.postMessage('reset');
                        }
                        outputBuffer.set(buffer);
                    }

                    //binarize.pack(buffer, function (buffer) {
                    //    //console.log("sending audio");
                    //    self.websocket.send(buffer);
                    //});

                    self.websocket.send(outputBuffer);
                };
                audioInput.connect(pNode);
                //gNode.connect(pNode);
                //Connect mic audio to Mixer
                pNode.connect(audioMerger);
    
                //Create SourceNode to rx audio from websocket;
                var rbuf = [];
                var frame = null;
                rxAudio = audioContext.createScriptProcessor(BUFFER_LENGTH,1,1);
                rxAudio.onaudioprocess = function (event) {
                    var i;
                    //Nothing in the buffer, or we have just started receiving and we want
                    //to buffer up the audio before playing back
                    if (self.rxBuffer.length === 0 || (!self.playing && self.rxBuffer.length < BUFFER_LENGTH * 3)) {
                        event.outputBuffer.getChannelData(0).set(zerobuf);
                    //We've got at least one full buffer, play it
                    } else if (self.rxBuffer.length > BUFFER_LENGTH) {
                        rbuf = [];
                        self.playing = true;
                        for (i=0; i<BUFFER_LENGTH; i++) {
                            rbuf.push(self.rxBuffer.shift());
                        }
                        event.outputBuffer.getChannelData(0).set(rbuf);
                        //event.outputBuffer.getChannelData(1).set(rbuf);
                    //We've got a partial buffer, play the remaining then stop, wait for full buffer
                    } else {
                        rbuf = [];
                        //Fill with actual audio
                        for (i=0; i<self.rxBuffer.length; i++) {
                            rbuf.push(self.rxBuffer.shift());
                        }
                        //pad remaining buffer with silence
                        for (i=0; i<(BUFFER_LENGTH - rbuf.length); i++) {
                            rbuf.push(0.0);
                        }
                        event.outputBuffer.getChannelData(0).set(rbuf);
                        //event.outputBuffer.getChannelData(1).set(rbuf);
                        self.playing = false;
                    }
                };
                rxAudio.connect(audioMerger);
                audioMerger.connect(audioContext.destination);
            }, function() {});            
        },
        
        disconnect : function () {
            if (this.websocket.close) {
                this.websocket.close();
            }
        }
    };
  
  return function(host, callback) {
    return new ClientAudio(host, callback);
  };
  
}());

function moduleDidLoad(){
  AudioModule = document.getElementById('echo');
  AudioModule.addEventListener('message', handleMessage);

  AudioModule.postMessage({'sample_rate':audioContext.sampleRate.toString(),
                           'frame_size':FRAME_SIZE.toString()});

}

function handleMessage(message){
   if(typeof(message.data) == 'string'){
     console.log(message.data);
   } 
   else if(typeof(message.data) == 'object'){
     processedBuffer = message.data;
     floatBuffer = new Float32Array(processedBuffer);
  }
}


