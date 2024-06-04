'use client'

import React from 'react'
import styled from 'styled-components';

const NavBar = () => {
    return (
        <Con>
            <div className='left flex items-center'>
                <img className='mr-2' src="/images/logo.svg" alt="img" />
                <div>
                    <p className='top'>Frontend developer</p>
                    <p className='bottom'>Skill assessment test</p>
                </div>
            </div>
            <div className='right flex items-center'>
                <TimeBox>
                    <img className='ml-3' src="/images/time.svg" alt="img" />
                    <p>29:10 <span>time left</span></p>
                </TimeBox>
                <img className='ml-3' src="/images/see.svg" alt="img" />
            </div>
        </Con>
    )
}

const Con = styled.div`  
    width: 100%;     
    display: flex;
    justify-content: space-between;
    align-items: center; 
    padding: 10px 50px;
    .top{
        font-family: DM Sans;
        font-size: 20px;
        font-weight: 500;
        line-height: 26.04px;
        letter-spacing: -0.23999999463558197px;
        text-align: left;
        color: rgba(0, 0, 0, 1);
    }
    .bottom{
        font-family: DM Sans;
        font-size: 14px;
        font-weight: 400;
        line-height: 18.23px;
        letter-spacing: -0.23999999463558197px;
        text-align: left;
        color: rgba(140, 140, 161, 1);
    }
`;

const TimeBox = styled.div`  
    width: 168px;    
    height: 44px; 
    display: flex; 
    justify-content:center;
    align-items: center;  
    background:rgba(236, 232, 255, 1);
    border-radius: 7px;
    p{
        font-family: DM Sans;
        font-size: 18px;
        font-weight: 700;
        line-height: 23.44px;
        text-align: center;
        color: rgba(117, 90, 226, 1);
        span{
            font-family: DM Sans;
            font-size: 14px;
            font-weight: 500;
            line-height: 18.23px;
            text-align: center; 
        }
    }
`;
export default NavBar