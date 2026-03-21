'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-bg-primary/95 backdrop-blur-lg shadow-lg shadow-primary/5 border-b border-border-color/50' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              {/* 神经网络风格 Logo */}
              <div className="w-12 h-12 bg-gradient-to-br from-primary via-secondary to-accent rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-all duration-300 group-hover:scale-105">
                <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
                  {/* 中心节点 */}
                  <circle cx="24" cy="24" r="4" fill="white" className="animate-pulse" />
                  {/* 周围节点 */}
                  <circle cx="12" cy="16" r="2.5" fill="white" opacity="0.9" />
                  <circle cx="36" cy="16" r="2.5" fill="white" opacity="0.9" />
                  <circle cx="12" cy="32" r="2.5" fill="white" opacity="0.9" />
                  <circle cx="36" cy="32" r="2.5" fill="white" opacity="0.9" />
                  {/* 连接线 */}
                  <line x1="24" y1="24" x2="12" y2="16" stroke="white" strokeWidth="1.5" opacity="0.7" />
                  <line x1="24" y1="24" x2="36" y2="16" stroke="white" strokeWidth="1.5" opacity="0.7" />
                  <line x1="24" y1="24" x2="12" y2="32" stroke="white" strokeWidth="1.5" opacity="0.7" />
                  <line x1="24" y1="24" x2="36" y2="32" stroke="white" strokeWidth="1.5" opacity="0.7" />
                  <line x1="12" y1="16" x2="36" y2="16" stroke="white" strokeWidth="1" opacity="0.4" />
                  <line x1="12" y1="32" x2="36" y2="32" stroke="white" strokeWidth="1" opacity="0.4" />
                </svg>
              </div>
              {/* 状态指示点 */}
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-bg-primary animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-text-primary tracking-tight">AI<span className="text-primary">OO</span></span>
              <span className="text-xs text-text-muted -mt-1">探索 AI 实践</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            <div className="w-px h-6 bg-border-color"></div>
            <a 
              href="https://github.com/guguoyi/ai-alpha" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg text-text-muted hover:text-primary hover:bg-primary/10 transition-all duration-200"
              title="GitHub"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>

          <div className="md:hidden">
            <a 
              href="https://github.com/guguoyi/ai-alpha" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-text-muted hover:text-primary transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;