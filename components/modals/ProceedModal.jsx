'use client'

import React, { useState, useEffect, useContext } from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import PurpleSmallBtn from '../PurpleBtn';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "472px",
    height: "auto",
    border: "none",
    bgcolor: 'rgba(245, 243, 255, 1)',
    borderRadius: "18px",
    outline: "none", 
    '@media (max-width: 500px)': {
        width: "90%",
    },
};

const ProceedModal = ({mOpen, handleModClose,}) => {
    return (
        <Modal
            open={mOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClose={handleModClose} 
        >
            <Box sx={style}>
                <ModCon>

                    <div className='head-row'>
                        <p>Start assessment</p>
                        <CloseBtn>Close</CloseBtn>
                    </div>
                    <div className='main-row'>

                    </div>
                    <div className='btn-row'>
                        <PurpleSmallBtn content="Proceed"/>
                    </div>
                </ModCon>

            </Box>
        </Modal>
    )
}

const ModCon = styled.div`
  width:100%;  
  margin-bottom:20px; 
  display: flex;
  flex-direction: column; 
  .head-row{
    width: 100%;
    height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(117, 90, 226, 1);
    border-top-left-radius:18px;
    border-top-right-radius:18px;
    padding: 0 30px;
    p{
        font-family: DM Sans;
        font-size: 16px;
        font-weight: 500;
        line-height: 23px;
        letter-spacing: -0.23999999463558197px;
        text-align: left;
        color: rgba(255, 255, 255, 1);
    }
  }
  .main-row{
    width: 100%;
    height: 100px;
  }
  .btn-row{
    display: flex;
    justify-content: flex-end;
    padding: 0 30px;
  }
`;

const CloseBtn = styled.button`  
    min-width: 75px;
    height: 32px; 
    color:white;
    background: rgba(245, 243, 255, 0.2);  
    border-radius: 8px; 
    font-family: Nunito;
    font-weight: 400;
    font-size: 14px; 
    transition: 300ms ease-in-out;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover{
      transform: scale(1.05);
    } 

`;

export default ProceedModal