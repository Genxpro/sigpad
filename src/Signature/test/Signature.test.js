import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Signature from '../index';
import SignatureView from '../SignatureView';


describe('Signature Package Test', () => {
  test('Render Signature', () => {
    render(<Signature />);
  });

  test('should work', async () => {
    // Render the component
    render(<SignatureView test={true}/>);
  
    // Find the 'Draw' tab and click on it
    const openModel = screen.getByText('Sign');
    fireEvent.click(openModel);
  
    // Check if the 'Draw' tab is active
    const typeTab = screen.getByText('Type');
    const drawTabElement = screen.getByText('Draw');
    await waitFor(() => {      
      expect(drawTabElement).toHaveClass('active');
      expect(typeTab).not.toHaveClass('active');
    });
  
    // Find the 'Type' tab and click on it  
    fireEvent.click(typeTab);
  
    // Check if the 'Type' tab is active
    await waitFor(() => {
      expect(typeTab).toHaveClass('active');
    });
  });
});