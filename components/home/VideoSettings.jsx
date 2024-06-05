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


    console.log(detections);

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
                                {!isInternetStable && <img className='' src="/images/serwifi.svg" alt="img" />}
                            </>
                        }
                    </div>
                    {isInternetStable === null ?
                        <div className='icon-con mb-1'>
                            <img className='' src="/images/dwifi.svg" alt="img" />
                        </div> :
                        <>
                            {isInternetStable && <img className='mb-1' src="/images/check.svg" alt="img" />}
                            {!isInternetStable && <img className='mb-1' src="/images/erlight.svg" alt="img" />}
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