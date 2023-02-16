export interface AuthDataType {
    email: string;
    password: string;
}

export interface Person {
    email: string;
    id: string;
    full_name: string
}

export interface Message {
    id: string;
    sender: Person;
    receiver: Person;
    data: string;
    timestamp: Date;
    read: boolean;
    reaction: string;
}

export interface Convo {
    name: string;
    approved: boolean;
    other_user: Person;
    last_message: Message;
}
export interface NewICECandidateMessage {
    target: string;
    type: 'new-ice-candidate';
    candidate: RTCIceCandidate;
  };

export interface NewVideoOfferMsg {
    name: string;
    target: string;
    type: 'video-offer';
    sdp: RTCSessionDescription
  }

export interface MainContextType {
    conversationName: string | undefined;
    setConversationName: Function;
    tab: string;
    setTab: Function
} 