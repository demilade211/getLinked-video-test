'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import Webcam from 'react-webcam';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import { containsPerson, checkMicrophone, analyzeBrightness, checkInternetConnection } from "@/utils/mediaHelpers";

const VideoSettings = ({ setButtonDisabled }) => {
    const webcamRef = useRef(null);
    const [model, setModel] = useState(null);
    const [detections, setDetections] = useState([]);
    const [isCameraOn, setIsCameraOn] = useState(null);
    const [isMicOn, setIsMicOn] = useState(null);
    const [isInternetStable, setIsInternetStable] = useState(null);
    const [isBrightnessNormal, setIsBrightnessNormal] = useState(null); 

    useEffect(() => {
        const loadModel = async () => {
            const loadedModel = await cocoSsd.load();
            setModel(loadedModel);
        };
        loadModel();
    }, []);

    useEffect(() => {
        const checkDevices = async () => {
            if (webcamRef.current) {
                setIsCameraOn(true);
            }
            const micStatus = await checkMicrophone();
            setIsMicOn(micStatus);
        };
        checkDevices();
        checkInternetConnection(setIsInternetStable);
    }, [webcamRef.current]);

    useEffect(() => {
        if (isCameraOn) {
            const interval = setInterval(() => {
                analyzeBrightness(webcamRef.current.video, setIsBrightnessNormal);
            }, 1000); // Analyze every second
            return () => clearInterval(interval);
        }
    }, [isCameraOn]);

    const detectObjects = useCallback(async () => {
        if (webcamRef.current && webcamRef.current.video.readyState === 4) {
            const video = webcamRef.current.video;
            const predictions = await model.detect(video);
            setDetections(predictions);
        }
    }, [model]);

    useEffect(() => {
        if (model) {
            const interval = setInterval(detectObjects, 1000); // Detect every second
            return () => clearInterval(interval);
        }
    }, [model, detectObjects]);

    useEffect(() => {
        const checkAllConditions = () => {
            const conditionsMet = containsPerson(detections) && isMicOn && isCameraOn && isInternetStable && isBrightnessNormal;
            setButtonDisabled(!conditionsMet);
        };
        checkAllConditions();
    }, [detections, isMicOn, isCameraOn, isInternetStable, isBrightnessNormal, setButtonDisabled]);



    return (
        <VideoSettingsContainer>
            <div className={`left ${!containsPerson(detections) && "not-person"} mb-3 lg:mb-0`}>
                <Webcam ref={webcamRef} audio={false} style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
                {isCameraOn && (
                    <div className={`detect ${containsPerson(detections) && "d-person"}`}>
                        {detections.map((detection, index) => (
                            <p key={index}>
                                {detection.class} - {Math.round(detection.score * 100)}% detected
                            </p>
                        ))}
                    </div>
                )}
            </div>

            <div className='right '>
                <div className='box'>
                    <div className='img-con'>
                        {isCameraOn === null ?
                            <img className='' src="/images/disabled.svg" alt="img" />
                            :
                            <img className='' src="/images/ecam.svg" alt="img" />
                        }
                    </div>
                    {isCameraOn === null ? <div className='icon-con mb-1'>
                        <img className='' src="/images/dvid.svg" alt="img" />
                    </div> : <>{isCameraOn && <img className='mb-1' src="/images/check.svg" alt="img" />}</>}
                    <p>Webcam</p>
                </div>
                <div className='box'>
                    <div className='img-con'>
                        {isInternetStable === null ?
                            <img className='' src="/images/disabled.svg" alt="img" />
                            :
                            <>
                                {isInternetStable && <img className='' src="/images/swifi.svg" alt="img" />}
                                {!isInternetStable && <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="16" height="16" rx="8" fill="#FF5F56" />
                                    <path d="M5.04584 7.93334C6.8375 6.55 9.16667 6.55 10.9583 7.93334" stroke="white" stroke-width="0.3" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M3.83331 6.48332C6.35831 4.53332 9.64165 4.53332 12.1666 6.48332" stroke="white" stroke-width="0.3" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M5.82916 9.45417C7.14166 8.4375 8.85416 8.4375 10.1667 9.45417" stroke="white" stroke-width="0.3" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M6.91663 10.9792C7.57496 10.4708 8.42913 10.4708 9.08746 10.9792" stroke="white" stroke-width="0.3" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>}
                            </>
                        }
                    </div>
                    {isInternetStable === null ?
                        <div className='icon-con mb-1'>
                            <img className='' src="/images/dwifi.svg" alt="img" />
                        </div> :
                        <>
                            {isInternetStable && <img className='mb-1' src="/images/check.svg" alt="img" />}
                            {!isInternetStable && <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="17.5001" cy="17.5" r="17.5" fill="#F6E4EE" />
                                <mask id="path-2-inside-1_3_123" fill="white">
                                    <path d="M17.5632 35.0316C19.8613 35.0274 22.1361 34.5707 24.2577 33.6874C26.3793 32.8041 28.3062 31.5116 29.9283 29.8836C31.5503 28.2557 32.8359 26.3242 33.7115 24.1994C34.5871 22.0746 35.0357 19.7981 35.0315 17.5C35.0274 15.2019 34.5706 12.9271 33.6873 10.8055C32.8041 8.68387 31.5115 6.75701 29.8836 5.13492C28.2556 3.51283 26.3241 2.22728 24.1993 1.35165C22.0745 0.476032 19.7981 0.0274902 17.5 0.0316393L17.5031 1.75698C19.5746 1.75324 21.6266 2.15756 23.5419 2.94685C25.4572 3.73614 27.1983 4.89496 28.6658 6.35712C30.1332 7.81929 31.2983 9.55617 32.0945 11.4686C32.8907 13.381 33.3025 15.4316 33.3062 17.5031C33.3099 19.5747 32.9056 21.6267 32.1163 23.542C31.327 25.4573 30.1682 27.1984 28.7061 28.6658C27.2439 30.1333 25.507 31.2984 23.5946 32.0946C21.6821 32.8908 19.6316 33.3025 17.56 33.3062L17.5632 35.0316Z" />
                                </mask>
                                <path d="M17.5632 35.0316C19.8613 35.0274 22.1361 34.5707 24.2577 33.6874C26.3793 32.8041 28.3062 31.5116 29.9283 29.8836C31.5503 28.2557 32.8359 26.3242 33.7115 24.1994C34.5871 22.0746 35.0357 19.7981 35.0315 17.5C35.0274 15.2019 34.5706 12.9271 33.6873 10.8055C32.8041 8.68387 31.5115 6.75701 29.8836 5.13492C28.2556 3.51283 26.3241 2.22728 24.1993 1.35165C22.0745 0.476032 19.7981 0.0274902 17.5 0.0316393L17.5031 1.75698C19.5746 1.75324 21.6266 2.15756 23.5419 2.94685C25.4572 3.73614 27.1983 4.89496 28.6658 6.35712C30.1332 7.81929 31.2983 9.55617 32.0945 11.4686C32.8907 13.381 33.3025 15.4316 33.3062 17.5031C33.3099 19.5747 32.9056 21.6267 32.1163 23.542C31.327 25.4573 30.1682 27.1984 28.7061 28.6658C27.2439 30.1333 25.507 31.2984 23.5946 32.0946C21.6821 32.8908 19.6316 33.3025 17.56 33.3062L17.5632 35.0316Z" fill="#E6E0FF" stroke="#FF5F56" stroke-width="6" mask="url(#path-2-inside-1_3_123)" />
                                <path d="M18.0001 14.9175L17.1976 16.3125C17.0176 16.62 17.1676 16.875 17.5201 16.875H18.4726C18.8326 16.875 18.9751 17.13 18.7951 17.4375L18.0001 18.8325" stroke="#FF5F56" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M15.2251 22.53V21.66C13.5001 20.6175 12.0826 18.585 12.0826 16.425C12.0826 12.7125 15.4951 9.80249 19.3501 10.6425C21.0451 11.0175 22.5301 12.1425 23.3026 13.695C24.8701 16.845 23.2201 20.19 20.7976 21.6525V22.5225C20.7976 22.74 20.8801 23.2425 20.0776 23.2425H15.9451C15.1201 23.25 15.2251 22.9275 15.2251 22.53Z" stroke="#FF5F56" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M15.3751 25.5C17.0926 25.0125 18.9076 25.0125 20.6251 25.5" stroke="#FF5F56" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>}
                        </>
                    }

                    <p>Speed</p>
                </div>
                <div className='box'>
                    <div className='img-con'>
                        {isMicOn === null ?
                            <img className='' src="/images/disabled.svg" alt="img" />
                            :
                            <img className='' src="/images/emic.svg" alt="img" />
                        }
                    </div>
                    {isMicOn === null ?
                        <div className='icon-con mb-1'>
                            <img className='' src="/images/mic.svg" alt="img" />
                        </div>
                        :
                        <>
                            {isMicOn && <img className='mb-1' src="/images/check.svg" alt="img" />}
                            {!isMicOn && <img className='mb-1' src="/images/mic.svg" alt="img" />}
                        </>
                    }

                    <p>Gadget mic</p>
                </div>
                <div className='box'>
                    <div className='img-con'>
                        {isBrightnessNormal === null ?
                            <img className='' src="/images/disabled.svg" alt="img" />
                            :
                            <>
                                {isBrightnessNormal && <img className='' src="/images/slight.svg" alt="img" />}
                                {!isBrightnessNormal && <img className='' src="/images/serlight.svg" alt="img" />}
                            </>
                        }
                    </div>
                    {isBrightnessNormal === null ?
                        <div className='icon-con mb-1'>
                            <img className='' src="/images/dlight.svg" alt="img" />
                        </div>
                        :
                        <>
                            {isBrightnessNormal && <img className='mb-1' src="/images/check.svg" alt="img" />}
                            {!isBrightnessNormal && <img className='mb-1' src="/images/erlight.svg" alt="img" />}
                        </>
                    }

                    <p>Lighting</p>
                </div>
            </div>
        </VideoSettingsContainer>
    )
}

const VideoSettingsContainer = styled.div`  
    width: 100%;      
    display: flex;
    flex-wrap: wrap; 
    margin-bottom: 30px;
    @media (max-width: 511px) { 
        justify-content: center;
    }
    .left{
        width: 275px;
        height: 168px;  
        border-radius: 10px;
        border: 1px solid rgba(117, 90, 226, 1);  
        margin-right: 30px;
        position: relative;
        @media (max-width: 511px) { 
            margin-right: 0;
        }
        .detect{
            width: 150px;
            height: 24px;
            background: rgba(255, 0, 0, 0.5); 
            border-radius: 5px;
            position:absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            top:0;
            left:0;
            p{
                font-family: DM Sans;
                font-size: 10px;
                font-weight: 500;
                line-height: 13.02px;
                text-align: left;
                color: rgba(255, 255, 255, 1);
            }
        }
        .d-person{
            background: rgba(0, 255, 0, 0.5);
        }
    }
    .not-person{
        border: 3px solid rgba(255, 0, 0, 1)
    }
    .right{
        display: grid;
        grid-template-columns: 91px 91px;
        row-gap: 15px;
        column-gap:15px;
        .box{
            width: 100%;
            height: 71px;
            border-radius: 10px;
            background: rgba(245, 243, 255, 1);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            .img-con{
                position: absolute;
                right: 0;
                top: 0;
            }
            .icon-con{
                width: 35px;
                height: 35px;
                border-radius: 100%;
                background: rgba(230, 224, 255, 1);
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .border{ 
                background: rgba(255, 95, 86, 0.1); 
            }
            .error{ 
                background: rgba(255, 95, 86, 0.1); 
            }
            p{
                font-family: DM Sans;
                font-size: 10px;
                font-weight: 400;
                line-height: 13.02px;
                letter-spacing: -0.23999999463558197px;
                text-align: left; 
                color: rgba(74, 74, 104, 1);
            }
        }
    }
`;

export default VideoSettings