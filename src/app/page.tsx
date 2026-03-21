'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/UI/Navbar';
import Footer from '@/components/UI/Footer';

const aiTechnologies = [
  {
    title: "OpenClaw",
    description: "强大的 AI 代理管理框架",
    link: "https://openclaw.dev",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
      </svg>
    )
  },
  {
    title: "OpenCode",
    description: "开源的 AI 编码工具",
    link: "https://opencode.ai",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    )
  },
  {
    title: "Claude Code",
    description: "AI 编码助手",
    link: "https://claude.ai",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    )
  },
  {
    title: "Agent Skills",
    description: "AI 代理技能平台",
    link: "https://agent.skills",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    )
  },
  {
    title: "LiteLLM",
    description: "统一 LLM 调用接口",
    link: "https://litellm.ai",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    )
  },
  {
    title: "Agno Agent",
    description: "轻量级 AI 代理框架",
    link: "https://www.agno.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    )
  }
];

const Hero: React.FC = () => {
  const scrollToExplore = () => {
    const exploreSection = document.getElementById('explore');
    if (exploreSection) {
      exploreSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-secondary/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex-1 flex flex-col justify-center">
        <div className="inline-block animate-float">
          <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-primary via-secondary to-accent rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/30 group-hover:shadow-primary/50 transition-all duration-300">
            {/* 神经网络风格大 Logo */}
            <svg viewBox="0 0 48 48" className="w-16 h-16" fill="none">
              {/* 中心节点 */}
              <circle cx="24" cy="24" r="5" fill="white" className="animate-pulse" />
              {/* 周围节点 */}
              <circle cx="10" cy="14" r="3" fill="white" opacity="0.9" />
              <circle cx="38" cy="14" r="3" fill="white" opacity="0.9" />
              <circle cx="10" cy="34" r="3" fill="white" opacity="0.9" />
              <circle cx="38" cy="34" r="3" fill="white" opacity="0.9" />
              {/* 连接线 */}
              <line x1="24" y1="24" x2="10" y2="14" stroke="white" strokeWidth="2" opacity="0.7" />
              <line x1="24" y1="24" x2="38" y2="14" stroke="white" strokeWidth="2" opacity="0.7" />
              <line x1="24" y1="24" x2="10" y2="34" stroke="white" strokeWidth="2" opacity="0.7" />
              <line x1="24" y1="24" x2="38" y2="34" stroke="white" strokeWidth="2" opacity="0.7" />
              <line x1="10" y1="14" x2="38" y2="14" stroke="white" strokeWidth="1.5" opacity="0.4" />
              <line x1="10" y1="34" x2="38" y2="34" stroke="white" strokeWidth="1.5" opacity="0.4" />
              {/* 额外的交叉连接 */}
              <line x1="10" y1="14" x2="38" y2="34" stroke="white" strokeWidth="1" opacity="0.3" />
              <line x1="38" y1="14" x2="10" y2="34" stroke="white" strokeWidth="1" opacity="0.3" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="text-text-primary">探索 </span>
          <span className="gradient-text">AI 实践</span>
        </h1>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-12">
          连接 AI 技术与实际应用，发现 AI 代理的无限可能
        </p>

        <div className="relative max-w-5xl mx-auto w-full px-4">
          <div className="absolute -inset-6 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-xl opacity-50"></div>
          <div className="relative aspect-video bg-bg-tertiary rounded-2xl overflow-hidden shadow-2xl border border-border-color/50">
            <video
              src="/ai-mother.mp4"
              autoPlay
              muted
              loop
              playsInline
              controls
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      {/* 向下滚动提示箭头 */}
      <button
        onClick={scrollToExplore}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-text-muted hover:text-primary transition-colors duration-300 cursor-pointer group"
        aria-label="向下滚动"
      >
        <span className="text-sm font-medium opacity-70 group-hover:opacity-100 transition-opacity">探索更多</span>
        <div className="w-10 h-10 rounded-full border-2 border-current flex items-center justify-center animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </button>
    </section>
  );
};

const AIMotherSection: React.FC = () => {
  return (
    <section className="py-32 bg-bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(99,102,241,0.1),transparent_50%)]"></div>
      <div className="absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-1/3 w-48 h-48 bg-secondary/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-xl opacity-50"></div>
            <div className="relative aspect-video bg-bg-tertiary rounded-2xl overflow-hidden shadow-2xl border border-border-color/50">
              <img
                src="/aimother.png"
                alt="AI Mother 飞书交互图"
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary/50 to-transparent"></div>
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-xl opacity-20 blur-xl"></div>
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-full opacity-20 blur-lg"></div>
          </div>
          
          <div>
            <h2 className="text-4xl font-bold mb-4">
              <span className="gradient-text">AI Mother</span>
            </h2>
            <p className="text-lg text-text-secondary mb-6">
              AI 代理管理系统，监控和管理其他 AI 代理（Claude Code、Codex、OpenCode 等）
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 group/item">
                <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 group-hover/item:bg-success/30 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-success">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <span className="text-text-secondary group-hover/item:text-text-primary transition-colors">自动发现和监控所有运行中的 AI 代理</span>
              </li>
              <li className="flex items-center gap-3 group/item">
                <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 group-hover/item:bg-success/30 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-success">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <span className="text-text-secondary group-hover/item:text-text-primary transition-colors">智能健康检查和自动修复常见问题</span>
              </li>
              <li className="flex items-center gap-3 group/item">
                <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0 group-hover/item:bg-success/30 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 text-success">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <span className="text-text-secondary group-hover/item:text-text-primary transition-colors">通过飞书实时通知和权限管理</span>
              </li>
            </ul>
            <a 
              href="/practice/ai-mother" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all duration-300 group/btn"
            >
              <span>了解更多</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const ExploreSection: React.FC = () => {
  return (
    <section id="explore" className="py-32 bg-bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">探索实践</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            访问 AI 相关的技术官网，探索最新的 AI 工具和框架
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {aiTechnologies.map((tech, index) => (
            <a
              key={index}
              href={tech.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block group animate-float"
              style={{ animationDelay: `${index * 0.15}s`, animationDuration: `${2.5 + index * 0.2}s` }}
            >
              <div className="bg-bg-secondary border border-border-color rounded-2xl p-6 h-full flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:bg-bg-secondary/80 hover:shadow-xl hover:shadow-primary/20 hover:border-primary/50">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mb-4 text-white transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                  {tech.icon}
                </div>
                <h3 className="font-semibold mb-2 text-sm sm:text-base">{tech.title}</h3>
                <p className="text-text-muted text-xs sm:text-sm leading-relaxed">{tech.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <AIMotherSection />
        <ExploreSection />
      </main>
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;