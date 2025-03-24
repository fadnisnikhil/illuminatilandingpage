'use client';

import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export function BrainIcon({ className = '', size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M16 4C14 4 12 5 11 6.5C10 5 8 4 6 4C3 4 1 6 1 9C1 15 7 20 11 23C12 23.7 14 25 16 25C18 25 20 23.7 21 23C25 20 31 15 31 9C31 6 29 4 26 4C24 4 22 5 21 6.5C20 5 18 4 16 4Z" fill="black"/>
      <path d="M16 6C14.5 6 13 7 12 8C11 7 9.5 6 8 6C6 6 4 8 4 10C4 14 8 18 12 21C13 21.7 14.5 22 16 22C17.5 22 19 21.7 20 21C24 18 28 14 28 10C28 8 26 6 24 6C22.5 6 21 7 20 8C19 7 17.5 6 16 6Z" fill="currentColor"/>
    </svg>
  );
}

export function BatteryIcon({ className = '', size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="4" y="8" width="22" height="16" rx="2" fill="black"/>
      <rect x="26" y="12" width="4" height="8" rx="1" fill="black"/>
      <rect x="6" y="10" width="18" height="12" rx="1" fill="currentColor"/>
      <rect x="8" y="12" width="4" height="8" fill="rgba(0,0,0,0.2)"/>
      <rect x="14" y="12" width="4" height="8" fill="rgba(0,0,0,0.2)"/>
      <rect x="20" y="12" width="2" height="8" fill="rgba(0,0,0,0.2)"/>
      <path d="M18 16L23 9V15H26L21 23V16H18Z" fill="white"/>
    </svg>
  );
}

export function NutritionIcon({ className = '', size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="16" cy="16" r="14" fill="black"/>
      <circle cx="16" cy="16" r="12" fill="currentColor"/>
      <path d="M10 14C10 12.8954 10.8954 12 12 12H20C21.1046 12 22 12.8954 22 14V20C22 21.1046 21.1046 22 20 22H12C10.8954 22 10 21.1046 10 20V14Z" fill="black"/>
      <path d="M8 10C8 8.89543 8.89543 8 10 8H22C23.1046 8 24 8.89543 24 10V12C24 13.1046 23.1046 14 22 14H10C8.89543 14 8 13.1046 8 12V10Z" fill="white"/>
      <path d="M14 20C14 18.8954 14.8954 18 16 18H20C21.1046 18 22 18.8954 22 20V22C22 23.1046 21.1046 24 20 24H16C14.8954 24 14 23.1046 14 22V20Z" fill="white"/>
    </svg>
  );
}

export function LifestyleIcon({ className = '', size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M4 12C4 7.58172 7.58172 4 12 4H20C24.4183 4 28 7.58172 28 12V20C28 24.4183 24.4183 28 20 28H12C7.58172 28 4 24.4183 4 20V12Z" fill="black"/>
      <path d="M6 12C6 8.68629 8.68629 6 12 6H20C23.3137 6 26 8.68629 26 12V20C26 23.3137 23.3137 26 20 26H12C8.68629 26 6 23.3137 6 20V12Z" fill="currentColor"/>
      <circle cx="16" cy="12" r="4" fill="white"/>
      <path d="M10 20C10 17.7909 11.7909 16 14 16H18C20.2091 16 22 17.7909 22 20V24C22 25.1046 21.1046 26 20 26H12C10.8954 26 10 25.1046 10 24V20Z" fill="white"/>
    </svg>
  );
}

export function CommunityIcon({ className = '', size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="10" cy="10" r="6" fill="black"/>
      <circle cx="22" cy="10" r="6" fill="black"/>
      <circle cx="16" cy="22" r="6" fill="black"/>
      <circle cx="10" cy="10" r="4" fill="currentColor"/>
      <circle cx="22" cy="10" r="4" fill="currentColor"/>
      <circle cx="16" cy="22" r="4" fill="currentColor"/>
      <path d="M10 10L22 10M10 10L16 22M22 10L16 22" stroke="white" strokeWidth="2"/>
    </svg>
  );
}

export function QualityIcon({ className = '', size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M16 4L19.0979 10.9021L26 14L19.0979 17.0979L16 24L12.9021 17.0979L6 14L12.9021 10.9021L16 4Z" fill="black"/>
      <path d="M16 8L18.0557 12.9443L23 15L18.0557 17.0557L16 22L13.9443 17.0557L9 15L13.9443 12.9443L16 8Z" fill="currentColor"/>
      <circle cx="16" cy="15" r="2" fill="white"/>
    </svg>
  );
}

export function InnovationIcon({ className = '', size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M16 6C13.7909 6 12 7.79086 12 10V18H20V10C20 7.79086 18.2091 6 16 6Z" fill="black"/>
      <path d="M12 18H20V22C20 24.2091 18.2091 26 16 26C13.7909 26 12 24.2091 12 22V18Z" fill="black"/>
      <path d="M14 4C14 2.89543 14.8954 2 16 2C17.1046 2 18 2.89543 18 4V6H14V4Z" fill="black"/>
      <path d="M14 8C14 6.89543 14.8954 6 16 6C17.1046 6 18 6.89543 18 8V16H14V8Z" fill="currentColor"/>
      <path d="M14 18H18V20C18 21.1046 17.1046 22 16 22C14.8954 22 14 21.1046 14 20V18Z" fill="currentColor"/>
      <rect x="15" y="22" width="2" height="6" fill="black"/>
      <rect x="12" y="26" width="8" height="2" rx="1" fill="black"/>
    </svg>
  );
} 