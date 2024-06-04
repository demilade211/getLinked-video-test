'use client'

import React from 'react'
import styled from 'styled-components';

const Footer = () => {
  return (
    <Con>
        <img className='mr-2' src="/images/flogo.svg" alt="img" />
    </Con>
  )
}

const Con = styled.div`  
    width: 100%;     
    display: flex; 
    align-items: center; 
    padding: 10px 50px; 
`;

export default Footer