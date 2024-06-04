
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import React from 'react'
import styled from 'styled-components';

const AppLayout = ({ children }) => {
    return (
        <Con>
            <NavBar />
            {children}
            <Footer />
        </Con>
    )
}

const Con = styled.div`  
  width: 100%;   
`;

export default AppLayout