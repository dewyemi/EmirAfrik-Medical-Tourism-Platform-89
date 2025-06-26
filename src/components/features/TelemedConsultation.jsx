import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { FiVideo, FiMic, FiMicOff, FiVideoOff, FiPhone, FiMessageSquare, FiShare, FiUsers, FiClock } = FiIcons;

const TelemedConsultation = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [consultationStatus, setConsultationStatus] = useState('scheduled'); // scheduled, connecting, active, ended
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  
  const videoRef = useRef(null);
  const doctorVideoRef = useRef(null);

  const upcomingConsultations = [
    {
      id: 1,
      doctorName: 'Dr. Ahmed Al-Rashid',
      specialty: 'Cardiology',
      date: '2024-01-25',
      time: '14:00',
      duration: '30 minutes',
      type: 'Pre-treatment Consultation',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 2,
      doctorName: 'Dr. Sarah Al-Mahmoud',
      specialty: 'General Medicine',
      date: '2024-01-28',
      time: '10:30',
      duration: '45 minutes',
      type: 'Follow-up Consultation',
      avatar: 'https://images.unsplash.com/photo-1594824388060-c4ad8e2a6c24?w=100&h=100&fit=crop&crop=face'
    }
  ];

  const startCall = async () => {
    setConsultationStatus('connecting');
    
    // Simulate connection process
    setTimeout(() => {
      setIsCallActive(true);
      setConsultationStatus('active');
      
      // Initialize video stream
      initializeVideo();
    }, 2000);
  };

  const endCall = () => {
    setIsCallActive(false);
    setConsultationStatus('ended');
    
    // Stop video streams
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const initializeVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current && videoRef.current.srcObject) {
      const audioTracks = videoRef.current.srcObject.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = isMuted;
      });
    }
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    if (videoRef.current && videoRef.current.srcObject) {
      const videoTracks = videoRef.current.srcObject.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = !isVideoOn;
      });
    }
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        sender: 'patient',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  if (consultationStatus === 'active' && isCallActive) {
    return (
      <div className="fixed inset-0 bg-black z-50">
        {/* Video Call Interface */}
        <div className="relative h-full">
          {/* Doctor Video - Main */}
          <div className="w-full h-full relative">
            <video
              ref={doctorVideoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              poster="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=600&fit=crop&crop=face"
            />
            
            {/* Doctor Info Overlay */}
            <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
              <h3 className="font-semibold">Dr. Ahmed Al-Rashid</h3>
              <p className="text-sm">Cardiology Specialist</p>
            </div>

            {/* Call Duration */}
            <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg">
              <span className="text-sm">23:45</span>
            </div>
          </div>

          {/* Patient Video - Picture in Picture */}
          <div className="absolute bottom-20 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              muted
            />
          </div>

          {/* Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 p-4">
            <div className="flex justify-center items-center space-x-6">
              <button
                onClick={toggleMute}
                className={`p-4 rounded-full ${isMuted ? 'bg-red-600' : 'bg-gray-600'} text-white hover:opacity-80 transition-opacity`}
              >
                <SafeIcon icon={isMuted ? FiMicOff : FiMic} className="w-6 h-6" />
              </button>

              <button
                onClick={toggleVideo}
                className={`p-4 rounded-full ${!isVideoOn ? 'bg-red-600' : 'bg-gray-600'} text-white hover:opacity-80 transition-opacity`}
              >
                <SafeIcon icon={isVideoOn ? FiVideo : FiVideoOff} className="w-6 h-6" />
              </button>

              <button
                onClick={endCall}
                className="p-4 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                <SafeIcon icon={FiPhone} className="w-6 h-6 transform rotate-135" />
              </button>

              <button className="p-4 rounded-full bg-gray-600 text-white hover:opacity-80 transition-opacity">
                <SafeIcon icon={FiMessageSquare} className="w-6 h-6" />
              </button>

              <button className="p-4 rounded-full bg-gray-600 text-white hover:opacity-80 transition-opacity">
                <SafeIcon icon={FiShare} className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Telemedicine Consultations</h1>
        <p className="text-gray-600">Connect with UAE specialists from anywhere in the world</p>
      </div>

      {/* Upcoming Consultations */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Consultations</h3>
        
        <div className="space-y-4">
          {upcomingConsultations.map((consultation, index) => (
            <motion.div
              key={consultation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={consultation.avatar}
                    alt={consultation.doctorName}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  
                  <div>
                    <h4 className="font-semibold text-gray-900">{consultation.doctorName}</h4>
                    <p className="text-sm text-gray-600">{consultation.specialty}</p>
                    <p className="text-sm text-blue-600">{consultation.type}</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-2">
                    <SafeIcon icon={FiClock} className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{consultation.date} at {consultation.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">Duration: {consultation.duration}</p>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={startCall}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                      <SafeIcon icon={FiVideo} className="w-4 h-4" />
                      <span>Join Call</span>
                    </button>
                    
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      Reschedule
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Connection Status */}
      {consultationStatus === 'connecting' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Connecting to Dr. Ahmed Al-Rashid</h3>
            <p className="text-gray-600">Please wait while we establish the connection...</p>
          </div>
        </motion.div>
      )}

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <SafeIcon icon={FiVideo} className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">HD Video Consultations</h3>
          <p className="text-gray-600">Crystal clear video calls with UAE specialists using secure, HIPAA-compliant technology.</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <SafeIcon icon={FiUsers} className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Multi-Party Consultations</h3>
          <p className="text-gray-600">Include family members, local doctors, or interpreters in your consultation calls.</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <SafeIcon icon={FiShare} className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Screen Sharing</h3>
          <p className="text-gray-600">Share medical reports, test results, and images directly during your consultation.</p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6 text-center">
        <h3 className="text-xl font-semibold mb-2">Need an Immediate Consultation?</h3>
        <p className="mb-4">Connect with available specialists 24/7 for urgent medical questions</p>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          Request Emergency Consultation
        </button>
      </div>
    </div>
  );
};

export default TelemedConsultation;