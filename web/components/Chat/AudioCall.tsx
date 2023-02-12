// import { ImPhoneHangUp } from 'react-icons/im'
// import { SendJsonMessage } from 'react-use-websocket/dist/lib/types';
// import { useUser } from '../../swr/user';
// import { useConversation } from '../../swr/chat';

// export default function AudioCall({sendJsonMessage, conversationName}: {
//     sendJsonMessage: SendJsonMessage;
//     conversationName:string}){

//     const { user } = useUser()
//     const { conversation } = useConversation(conversationName)
    
//     const name = user.full_name
//     const target = conversation.other_user.full_name

//     let myPeerConnection: RTCPeerConnection

//     function handleNegotiationNeededEvent() {
//         myPeerConnection
//           .createOffer()
//           .then((offer) => myPeerConnection.setLocalDescription(offer))
//           .then(() => {
//             // send to ws
//             sendJsonMessage({
//               name, target,
//               type: "video-offer",
//               sdp: !myPeerConnection.localDescription,
//             });
//           })
//           .catch(reportError);
//       }

//     // function handleVideoOfferMsg(msg) {
//     //     let localStream = null;
      
//     //     targetUsername = msg.name;
//     //     createPeerConnection();
      
//     //     const desc = new RTCSessionDescription(msg.sdp);
      
//     //     myPeerConnection
//     //       .setRemoteDescription(desc)
//     //       .then(() => navigator.mediaDevices.getUserMedia(mediaConstraints))
//     //       .then((stream) => {
//     //         localStream = stream;
//     //         document.getElementById("local_video").srcObject = localStream;
      
//     //         localStream
//     //           .getTracks()
//     //           .forEach((track) => myPeerConnection.addTrack(track, localStream));
//     //       })
//     //       .then(() => myPeerConnection.createAnswer())
//     //       .then((answer) => myPeerConnection.setLocalDescription(answer))
//     //       .then(() => {
//     //         const msg = {
//     //           name: myUsername,
//     //           target: targetUsername,
//     //           type: "video-answer",
//     //           sdp: myPeerConnection.localDescription,
//     //         };
      
//     //         sendJsonMessage(msg);
//     //       })
//     //       .catch(handleGetUserMediaError);
//     //   }
    
//     function handleICECandidateEvent(event) {
//         if (event.candidate) {
//           sendJsonMessage({
//             type: "new-ice-candidate",
//             target,
//             candidate: event.candidate,
//           });
//         }
//       }
    
//       function handleNewICECandidateMsg(msg) {
//         const candidate = new RTCIceCandidate(msg.candidate);
      
//         myPeerConnection.addIceCandidate(candidate).catch(reportError);
//       }
      
//     function handleTrackEvent(event) {
//         document.getElementById("received_video").srcObject = event.streams[0];
//         document.getElementById("hangup-button").disabled = false;
//       }
        
    
//     function handleRemoveTrackEvent(event) {
//         const stream = document.getElementById("received_video").srcObject;
//         const trackList = stream.getTracks();
      
//         if (trackList.length === 0) {
//           closeVideoCall();
//         }
//       }
    
//     function hangUpCall() {
//         closeVideoCall();
//         sendJsonMessage({
//           name, target,
//           type: "hang-up",
//         });
//       }
     
//     function closeVideoCall() {
//         const remoteVideo = document.getElementById("received_video");
//         const localVideo = document.getElementById("local_video");
      
//         if (myPeerConnection) {
//           myPeerConnection.ontrack = null;
//         //   myPeerConnection.onremoveTrack = null;
//         //   myPeerConnection.onremovestream = null;
//           myPeerConnection.onicecandidate = null;
//           myPeerConnection.oniceconnectionstatechange = null;
//           myPeerConnection.onsignalingstatechange = null;
//           myPeerConnection.onicegatheringstatechange = null;
//           myPeerConnection.onnegotiationneeded = null;
      
//           if (remoteVideo.srcObject) {
//             remoteVideo.srcObject.getTracks().forEach((track) => track.stop());
//           }
      
//           if (localVideo.srcObject) {
//             localVideo.srcObject.getTracks().forEach((track) => track.stop());
//           }
      
//           myPeerConnection.close();
//           myPeerConnection = null;
//         }
      
//         remoteVideo.removeAttribute("src");
//         remoteVideo.removeAttribute("srcObject");
//         localVideo.removeAttribute("src");
//         remoteVideo.removeAttribute("srcObject");
      
//         document.getElementById("hangup-button").disabled = true;
//         targetUsername = null;
//       }
      
      
//     function handleICEConnectionStateChangeEvent(event) {
//         switch (myPeerConnection.iceConnectionState) {
//           case "closed":
//           case "failed":
//             closeVideoCall();
//             break;
//         }
//       }

//     function handleSignalingStateChangeEvent(event) {
//         switch (myPeerConnection.signalingState) {
//           case "closed":
//             closeVideoCall();
//             break;
//         }
//       }
    
//     function handleICEGatheringStateChangeEvent(event) {
//         // Our sample just logs information to console here,
//         // but you can do whatever you need.
//       }
      
//     function createPeerConnection() {
//         myPeerConnection = new RTCPeerConnection({
//           iceServers: [
//             // Information about ICE servers - Use your own!
//             {
//               urls: "stun:stun.stunprotocol.org",
//             },
//           ],
//         });
      
//         myPeerConnection.onicecandidate = handleICECandidateEvent;
//         myPeerConnection.ontrack = handleTrackEvent;
//         myPeerConnection.onnegotiationneeded = handleNegotiationNeededEvent;
//         myPeerConnection.removeTrack = handleRemoveTrackEvent;
//         myPeerConnection.oniceconnectionstatechange =
//           handleICEConnectionStateChangeEvent;
//         myPeerConnection.onicegatheringstatechange =
//           handleICEGatheringStateChangeEvent;
//         myPeerConnection.onsignalingstatechange = handleSignalingStateChangeEvent;
//       }
      
//     const mediaConstraints = {
//         audio: true, // We want an audio track
//         video: true, // And we want a video track
//       };
    
      
//     function makeCall(evt) {
//         if (myPeerConnection) {
//           alert("You can't start a call because you already have one open!");
//         } else {
//           const clickedUsername = evt.target.textContent;
      
//           if (clickedUsername === myUsername) {
//             alert(
//               "I'm afraid I can't let you talk to yourself. That would be weird."
//             );
//             return;
//           }
      
//           targetUsername = clickedUsername; // get conversation name
//           createPeerConnection();
      
//           navigator.mediaDevices
//             .getUserMedia(mediaConstraints)
//             .then((localStream) => {
//               document.getElementById("local_video").srcObject = localStream;
//               localStream
//                 .getTracks()
//                 .forEach((track) => myPeerConnection.addTrack(track, localStream));
//             })
//             .catch(handleGetUserMediaError);
//         }
//       }
    
//       function handleGetUserMediaError(e) {
//         switch (e.name) {
//           case "NotFoundError":
//             alert(
//               "Unable to open your call because no camera and/or microphone" +
//                 "were found."
//             );
//             break;
//           case "SecurityError":
//           case "PermissionDeniedError":
//             // Do nothing; this is the same as the user canceling the call.
//             break;
//           default:
//             alert(`Error opening your camera and/or microphone: ${e.message}`);
//             break;
//         }
      
//         closeVideoCall();
//       }
      
      
      
//     return (
//         <div className="camera-box">
//             <video id="received_video" autoPlay></video>
//             <video id="local_video" autoPlay muted></video>
//             <button id="hangup-button" className='text-red-500' 
//             onClick={()=>{}} disabled>
//                 <ImPhoneHangUp /></button>
//         </div>
//     )
// }