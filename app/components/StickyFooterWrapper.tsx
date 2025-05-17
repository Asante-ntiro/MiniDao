"use client";
// components/StickyFooterWrapper.jsx
import { useState } from 'react';
import StickyFooter from './StickyFooter';

export default function StickyFooterWrapper() {
  const [activeTab, setActiveTab] = useState("home");
  
  return <StickyFooter activeTab={activeTab} setActiveTabAction={setActiveTab} />;
}