'use client'

import React, { useState } from 'react'
import styled from 'styled-components';
import AppLayout from '@/layouts/AppLayout';
import PurpleBtn from '@/components/PurpleBtn';
import VideoSettings from '@/components/home/VideoSettings';
import ProceedModal from '@/components/modals/ProceedModal';

export default function Home() {

  const [showModal, setShowModal] = useState({
    show: false,
    message: ""
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleShowModal = (e) => {
    setShowModal(prev => ({ ...prev, show: true }))
  }
  const handleCloseModal = () => setShowModal((prev) => ({ ...prev, show: false }));

  return (
    <AppLayout>
      <ProceedModal mOpen={showModal.show} handleModClose={handleCloseModal} buttonDisabled={buttonDisabled}/>
      <Con>
        <div className='inner'>
          <h1>System check</h1>
          <p className='sub-text'>
            We utilize your camera image to ensure fairness for all participants,
            and we also employ both your camera and microphone for a video questions
            where you will be prompted to record a response using your camera or webcam,
            so it's essential to verify that your camera and microphone are functioning
            correctly and that you have a stable internet connection. To do this, please
            position yourself in front of your camera, ensuring that your entire face is
            clearly visible on the screen. This includes your forehead, eyes, ears, nose,
            and lips. You can initiate a 5-second recording of yourself by clicking the
            button below.
          </p>
          <VideoSettings setButtonDisabled={setButtonDisabled}/>
          <PurpleBtn disabled={buttonDisabled} content="Take picture and continue" onClick={handleShowModal}/>
        </div>
      </Con>
    </AppLayout>
  );
}

const Con = styled.div`  
  width: 100%;      
  display: flex;
  justify-content: center;
  background: rgba(248, 249, 251, 1);
  padding: 20px;
  min-height: 100vh;
  .inner{
    width: 750px;   
    margin-top: 50px;
    padding: 30px;
    background: rgba(255, 255, 255, 1);
    border-radius: 20px;
    margin-bottom: 20px;
    @media (max-width: 511px) { 
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
    }
    h1{
      width: 100%;
      font-family: DM Sans;
      font-size: 20px;
      font-weight: 500;
      line-height: 25px;
      text-align: left;
      color: rgba(0, 0, 0, 1);
      margin-bottom: 10px;
    }
    .sub-text{
      font-family: DM Sans;
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      letter-spacing: -0.23999999463558197px;
      text-align: left;
      color: rgba(74, 74, 104, 1);
      margin-bottom: 30px;
    }
  }
`;

