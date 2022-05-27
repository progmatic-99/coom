import React, { useRef, useState } from "react";

function App() {
  const [pc, setPc] = useState<RTCPeerConnection>();
  const [socket, setSocket] = useState<SocketIOClient.Socket>();

  let localVideoRef = useRef<HTMLVideoElement>(null);
  let remoteVideoRef = useRef<HTMLVideoElement>(null);

  const pcConfig = {
    iceServers: [
      //       {
      // urls: "stun:[STUN_IP]:[PORT]",
      // credentials: "[CREDS]",
      // username: "[username]"
      //       },
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  };

  return <div className="App"></div>;
}

export default App;
