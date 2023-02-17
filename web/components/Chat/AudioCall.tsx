import { ImPhoneHangUp } from 'react-icons/im'
import { useUser } from '../../swr/user';
import { useEffect, useRef } from 'react';
import { NewICECandidateMessage, NewVideoOfferMsg } from '../../utils/types';
import { useCredentials, useWebsocketConncetionStatusHook } from '../../utils/hooks';
import useWebSocket from 'react-use-websocket';
import { useMainContext } from '../../contexts/MainContext';

export default function AudioCall(){
    const { user } = useUser()
    const { access } = useCredentials()
    const { callTarget } = useMainContext()
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);  

    const { readyState, sendJsonMessage } = useWebSocket(access ? `ws://127.0.0.1:8000/call/${user?.id}/` : null, {
        queryParams: {
            token: access ? access : "",
        },
        onMessage: (e)=> {
            const data = JSON.parse(e.data)
            console.log(data)
            switch(data.type){
                case 'video_offer_echo':
                    handleVideoOfferMsg(data['content'])
                    break
                case 'video_answer_echo':

                    break
                case 'new_ice_candidate_echo':
                    handleNewICECandidateMsg(data['content'])
                    break;
                case 'hang_up_echo':
                    break                         
                default:
                    console.error("Unknown message type!");
                    break;
            }

        }
    })
    const {connectionStatus} = useWebsocketConncetionStatusHook(readyState);
    console.log("[ CALL ]" , connectionStatus)

    const name = user?.id
    let myPeerConnection: RTCPeerConnection

    function handleNegotiationNeededEvent() {
        myPeerConnection
          .createOffer()
          .then((offer) => myPeerConnection.setLocalDescription(offer))
          .then(() => {
            // send to ws
            sendJsonMessage({
              name, target: callTarget,
              type: "video-offer",
              sdp: JSON.stringify(myPeerConnection.localDescription?.toJSON()),
            });
          })
          .catch(reportError);
      }

    function handleVideoOfferMsg(msg: NewVideoOfferMsg) {

        const targetUsername = msg.name;
        createPeerConnection();
      
        const desc = new RTCSessionDescription(JSON.parse(msg.sdp));
      
        myPeerConnection
          .setRemoteDescription(desc)
          .then(() => navigator.mediaDevices.getUserMedia(mediaConstraints))
          .then((stream) => {
            const localStream = stream;
            // document.getElementById("local_video").srcObject = localStream;
            if (localVideoRef.current){
                localVideoRef.current.srcObject = localStream;
            }
      
            localStream
              .getTracks()
              .forEach((track) => myPeerConnection.addTrack(track, localStream));
          })
          .then(() => myPeerConnection.createAnswer())
          .then((answer) => myPeerConnection.setLocalDescription(answer))
          .then(() => {
            const msg = {
              name, target: targetUsername,
              type: "video-answer",
              sdp: myPeerConnection.localDescription?.toJSON(),
            };
      
            sendJsonMessage(msg);
          })
          .catch(handleGetUserMediaError);
      }
    
    function handleICECandidateEvent(event: RTCPeerConnectionIceEvent) {
        if (event.candidate?.candidate) {
          sendJsonMessage({
            type: "new-ice-candidate",
            target: callTarget,
            candidate: JSON.stringify(event.candidate.toJSON()),
          });
        }
      }
    
    function handleNewICECandidateMsg(msg: NewICECandidateMessage) {
        const candidate = new RTCIceCandidate(JSON.parse(msg.candidate));
      
        myPeerConnection.addIceCandidate(candidate).catch(reportError);
      }
      
    function handleTrackEvent(event: RTCTrackEvent) {        
        if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
          }
        // document.getElementById("received_video").srcObject = event.streams[0];
        // document.getElementById("hangup-button").disabled = false;
      }
        
    
    function handleRemoveTrackEvent() {
        // const stream = document.getElementById("received_video").srcObject;
        const stream = remoteVideoRef.current?.srcObject as MediaStream;
        const trackList = stream.getTracks();
      
        if (trackList.length === 0) {
          closeVideoCall();
        }
      }
    
    function hangUpCall() {
        closeVideoCall();
        sendJsonMessage({
          name, target: callTarget,
          type: "hang-up",
        });
      }
     
    function closeVideoCall() {
        const remoteVideoStream = remoteVideoRef.current?.srcObject as MediaStream;
        const localVideoStream = localVideoRef.current?.srcObject as MediaStream;
      
        if (myPeerConnection) {
          myPeerConnection.ontrack = null;
        //   myPeerConnection.onremoveTrack = null;
        //   myPeerConnection.onremovestream = null;
          myPeerConnection.onicecandidate = null;
          myPeerConnection.oniceconnectionstatechange = null;
          myPeerConnection.onsignalingstatechange = null;
          myPeerConnection.onicegatheringstatechange = null;
          myPeerConnection.onnegotiationneeded = null;
      
          if (remoteVideoStream) {
            remoteVideoStream.getTracks().forEach((track) => track.stop());
          }
      
          if (localVideoStream) {
            localVideoStream.getTracks().forEach((track) => track.stop());
          }
      
          myPeerConnection.close();
        //   myPeerConnection = null;
        }
      
        // remoteVideo.removeAttribute("src");
        // remoteVideo.removeAttribute("srcObject");
        // localVideo.removeAttribute("src");
        // remoteVideo.removeAttribute("srcObject");
      
        // document.getElementById("hangup-button").disabled = true;
        // targetUsername = null;
      }
      
      
    function handleICEConnectionStateChangeEvent() {
        switch (myPeerConnection.iceConnectionState) {
          case "closed":
          case "failed":
            closeVideoCall();
            break;
        }
      }

    function handleSignalingStateChangeEvent() {
        switch (myPeerConnection.signalingState) {
          case "closed":
            closeVideoCall();
            break;
        }
      }
    
    function handleICEGatheringStateChangeEvent() {
        // Our sample just logs information to console here,
        // but you can do whatever you need.
      }
      
    function createPeerConnection() {
        myPeerConnection = new RTCPeerConnection({
          iceServers: [
            // Information about ICE servers - Use your own!
            {
              urls: "stun:stun.stunprotocol.org",
            },
          ],
        });
      
        myPeerConnection.onicecandidate = handleICECandidateEvent;
        myPeerConnection.ontrack = handleTrackEvent;
        myPeerConnection.onnegotiationneeded = handleNegotiationNeededEvent;
        myPeerConnection.removeTrack = handleRemoveTrackEvent;
        myPeerConnection.oniceconnectionstatechange =
          handleICEConnectionStateChangeEvent;
        myPeerConnection.onicegatheringstatechange =
          handleICEGatheringStateChangeEvent;
        myPeerConnection.onsignalingstatechange = handleSignalingStateChangeEvent;
      }
      
    const mediaConstraints = {
        audio: true, // We want an audio track
        video: true, // And we want a video track
      };
    
      
    function makeCall() {
        if (myPeerConnection) {
          alert("You can't start a call because you already have one open!");
        } else {
      
          createPeerConnection();
      
          navigator.mediaDevices
            .getUserMedia(mediaConstraints)
            .then((localStream) => {
            //   document.getElementById("local_video").srcObject = localStream;
                if (localVideoRef.current) {
                    localVideoRef.current.srcObject = localStream;
                }

                localStream
                    .getTracks()
                    .forEach((track) => myPeerConnection.addTrack(track, localStream));
            })
            .catch(handleGetUserMediaError);
        }
      }
    
    function handleGetUserMediaError(e:any) {
        switch (e.name) {
          case "NotFoundError":
            alert(
              "Unable to open your call because no camera and/or microphone" +
                "were found."
            );
            break;
          case "SecurityError":
          case "PermissionDeniedError":
            // Do nothing; this is the same as the user canceling the call.
            break;
          default:
            alert(`Error opening your camera and/or microphone: ${e.message}`);
            break;
        }
      
        closeVideoCall();
      }

    useEffect(()=> {
        if(callTarget){
            makeCall()
        }
    }, [callTarget])
      
      
    return (
        <>
        {callTarget && (<div className="fixed inset-0 top-4 z-50">
            <div className="bg-white border rounded-md w-2/3 mx-auto h-96">
                <div>
                    <video ref={localVideoRef} autoPlay />
                    <video ref={remoteVideoRef} autoPlay muted />
                    {/* <button id="hangup-button" className='text-red-500'  */}
                    {/* // onClick={()=>{}} disabled>
                    //     <ImPhoneHangUp /></button> */}
                </div>
            </div>
        </div>)}
        </>

    )
}