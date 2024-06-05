'use client'

import React from 'react'
import styled from 'styled-components';

const PurpleSmallBtn = ({ content, onClick, disabled }) => {
  return (
    <>
      <Btn onClick={onClick} disabled={disabled}>{content}</Btn>
    </>
  )
}

const Btn = styled.button`  
    min-width: 140px;
    height: 50px; 
    color:white;
    background: rgba(117, 90, 226, 1);  
    border-radius: 8px; 
    font-weight: 500;
    font-size: 14px; 
    transition: 300ms ease-in-out;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover{
      transform: scale(1.05);
    }
    

    &:disabled,
    button[disabled]{ 
      background:   #c9bef4;
      color:white;
    }

`;

export default PurpleSmallBtn