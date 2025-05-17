"use client";

import { type ReactNode, useCallback, useMemo, useState } from "react";

type TabItemProps = { 
    label: string,
    icon: React.ReactNode,
    isActive: boolean,
    onClick: () => void,
  }
  
  
  const TabItem = ( { label, icon, isActive, onClick }: TabItemProps) => {
    return (
      <button
        onClick={onClick}
        className={`flex flex-col items-center justify-center flex-1 py-2 ${
          isActive ? "text-purple-600" : "text-gray-400"
        }`}
      >
        <div className="mb-1">{icon}</div>
        <span className={`text-xs font-medium ${isActive ? "font-semibold" : ""}`}>
          {label}
        </span>
      </button>
    );
  };
  
  type StickyFooterProps = {
    activeTab: string;
    setActiveTabAction: (tabId: string) => void;
  
  }
  
  export default function StickyFooter({activeTab, setActiveTabAction}: StickyFooterProps) {
  
    const tabs = [
                    { 
                      id: "home",
                      label: "Home",
                      icon: (
                    <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                    </svg>
                    ),
  
                    isActive: true,
                    
                  }
      ,
                  { 
                    id: "features",
                    label: "Features",
                    icon: (
                  <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  >
                  <path d="M3 9h4V5H3v4zm0 5h4v-4H3v4zm5 0h4v-4H8v4zm5 0h4v-4h-4v4zM8 9h4V5H8v4zm5-4v4h4V5h-4z" />
                  </svg>
                  ),
                  isActive: false,
                  },
                  { 
                    id: "myProfile",
                    label: "My Profile",
                    icon: (
                  <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-" /> 
                  </svg>
                  ),
                  isActive: false,
                  },
                  { 
                    id: "proposals",
                    label: "Proposals",
                    icon: (
                  <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  >
                  <path d="M16 2H8C4.691 2 2 4.691 2 8v12c0 3.309 2.691 6 6 6h8c3.309 0 6-2.691 6-6V8c0-3.309-2.691-6-6-6zm0 2c2.273 0 4 1.727 4 4v12c0 2.273-1.727 4-4 4H8c-2.273 0-4-1.727-4-4V8c0-2.273 1.727-4 4-4h8zM12 6c1.105 0 2 .895 2 2s-.895 2-2 2-2-.895-2-2 .895-2 2-2zm0 4c-.552 0-1-.448-1-1s.448-1 1-1 1 .448 1 1-.448 1-1 1zm4 2H8v2h8v-2z"/> 
                  </svg>
                  ),
                  isActive: false,
                  },
                  ]
  {
    return (
      <footer className="fixed bottom-0 left-0 right-0 bg-[var(--app-background)] border-t border-[var(--app-card-border)] p-4">
        <div className="flex justify-center">
          {tabs.map((tab) => (
              <TabItem
              label={tab.label}
              icon={tab.icon}
              isActive={activeTab === tab.id}
              onClick={() => setActiveTabAction(tab.id)}
            />
  
          ))}
        </div>
      </footer>
    );
  }
  }