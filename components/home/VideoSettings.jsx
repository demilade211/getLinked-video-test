'use client'

import styled from 'styled-components';

const VideoSettings = () => {
    return (
        <VideoSettingsContainer>
            <div className='left mb-3 lg:mb-0'>

            </div>
            <div className='right '>
                <div className='box'>
                    <div className='img-con'>
                        <img className='' src="/images/disabled.svg" alt="img" />
                    </div>
                    <div className='icon-con mb-1'>
                        <img className='' src="/images/dvid.svg" alt="img" />
                    </div>
                    <p>Webcam</p>
                </div>
                <div className='box'>
                    <div className='img-con'>
                        <img className='' src="/images/disabled.svg" alt="img" />
                    </div>
                    <div className='icon-con mb-1'>
                        <img className='' src="/images/dwifi.svg" alt="img" />
                    </div>
                    <p>Speed</p>
                </div>
                <div className='box'>
                    <div className='img-con'>
                        <img className='' src="/images/disabled.svg" alt="img" />
                    </div>
                    <div className='icon-con mb-1'>
                        <img className='' src="/images/dvid.svg" alt="img" />
                    </div>
                    <p>Gadget mic</p>
                </div>
                <div className='box'>
                    <div className='img-con'>
                        <img className='' src="/images/disabled.svg" alt="img" />
                    </div>
                    <div className='icon-con mb-1'>
                        <img className='' src="/images/dlight.svg" alt="img" />
                    </div>
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
        @media (max-width: 511px) { 
            margin-right: 0;
        }
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