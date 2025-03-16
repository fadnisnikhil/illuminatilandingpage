'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from "../components/ui/dialog";
import { Button } from '../components/ui/button';
import { Checkbox } from '../components/ui/checkbox';

export default function AgeVerification() {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    const hasVerified = localStorage.getItem('age-verified');
    if (!hasVerified) {
      setIsOpen(true);
    }
  }, []);

  function handleVerification(remember: boolean) {
    if (remember) {
      localStorage.setItem('age-verified', 'true');
    } else {
      sessionStorage.setItem('age-verified', 'true');
    }
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md p-6 bg-black text-white border border-emerald-500" showClose={false}>
        <DialogTitle className="text-2xl font-bold text-center mb-6">Age Verification</DialogTitle>
        
        <div className="text-center mb-6">
          <p>This website requires you to be 18 years or older to enter. Please verify your age to continue:</p>
        </div>
        
        <div className="space-y-6">
          <p className="text-center text-sm text-gray-400">
            By clicking Enter, you confirm that you are 18 years of age or older.
          </p>
          
          <div className="flex items-center space-x-2 justify-center">
            <Checkbox id="remember" onCheckedChange={() => {}} />
            <label htmlFor="remember" className="text-sm">Remember me</label>
          </div>
          
          <div className="flex flex-col space-y-2">
            <Button 
              onClick={() => handleVerification(true)}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Enter Site
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 