'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Footer from '@/components/UI/Footer';

// 代码复制组件
const CodeBlock: React.FC<{ code: string; label?: string }> = ({ code, label }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  return (
    <div className="relative group">
      {label && <span className="text-xs text-text-muted mb-1 block">{label}</span>}
      <pre className="bg-bg-tertiary rounded-lg p-3 pr-12 text-sm text-text-secondary font-mono overflow-x-auto whitespace-pre-wrap">
        <code>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 rounded-lg bg-bg-secondary border border-border-color text-text-muted hover:text-primary hover:border-primary/50 transition-all duration-200 opacity-0 group-hover:opacity-100"
        title={copied ? '已复制!' : '复制代码'}
      >
        {copied ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-success">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5" />
          </svg>
        )}
      </button>
    </div>
  );
};

// 返回顶部按钮
const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-bg-secondary/90 backdrop-blur-lg border border-border-color rounded-full flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/50 transition-all duration-300 shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:scale-110"
      title="返回顶部"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </button>
  );
};

const AIMotherPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* 返回探索实践按钮 */}
      <Link
        href="/#explore"
        className="fixed left-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-bg-secondary/90 backdrop-blur-lg border border-border-color rounded-full flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/50 transition-all duration-300 shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:scale-110"
        title="返回探索实践"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
      </Link>

      <BackToTop />

      <main className="pt-16">
        <section className="min-h-[80vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-bg-primary to-bg-secondary z-0"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.15),transparent_50%)] z-0"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="block">AI</span>
                <span className="block gradient-text">Mother</span>
              </h1>
              
              <p className="text-xl text-text-secondary mb-8 leading-relaxed max-w-3xl mx-auto">
                AI 代理管理系统，监控和管理其他 AI 代理（Claude Code、Codex、OpenCode 等）
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <div className="relative aspect-video bg-bg-tertiary rounded-lg overflow-hidden">
                  <img 
                    src="/aimother.png" 
                    alt="AI Mother 飞书交互图" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-center text-text-muted mt-4">AI Mother 飞书交互界面</p>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold mb-4">核心功能</h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-primary">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V19.5a2.25 2.25 0 002.25 2.25h.75m0-3h-3.75m0 0H9m1.5 3h3.75m-3.75 0H9m1.5 3h.75" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">自动发现和监控</h3>
                      <p className="text-text-secondary">自动检测所有运行中的 AI 代理，包括 Claude Code、Codex、OpenCode 等</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-primary">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">智能健康检查</h3>
                      <p className="text-text-secondary">检测停止、空闲、速率限制、权限等待或错误状态</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-primary">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">自动修复</h3>
                      <p className="text-text-secondary">安全地恢复停止的进程，发送 Enter/Continue，请求状态更新</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-primary">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">灵活的权限处理</h3>
                      <p className="text-text-secondary">检测任何权限提示格式，通过飞书通知所有者，并接受任何响应格式</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-primary">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">动态巡逻频率</h3>
                      <p className="text-text-secondary">自动切换到活跃对话的 5 分钟巡逻，其他情况下为 30 分钟基线</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-primary">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">任务完成通知</h3>
                      <p className="text-text-secondary">当 AI 完成任务时通知您，避免重复通知</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-bg-secondary border border-border-color rounded-xl p-8 mb-16">
              <h2 className="text-2xl font-semibold mb-6 text-center">工作流程</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-bg-tertiary rounded-lg p-6">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                    <span className="text-primary font-bold text-xl">1</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-3">巡逻扫描</h3>
                  <p className="text-text-secondary">运行 patrol.sh 扫描所有 AI 代理，检测状态和问题</p>
                </div>
                
                <div className="bg-bg-tertiary rounded-lg p-6">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                    <span className="text-primary font-bold text-xl">2</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-3">诊断分析</h3>
                  <p className="text-text-secondary">获取 AI 上下文，分析问题，确定最佳行动方案</p>
                </div>
                
                <div className="bg-bg-tertiary rounded-lg p-6">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                    <span className="text-primary font-bold text-xl">3</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-3">行动或升级</h3>
                  <p className="text-text-secondary">自动修复安全问题，或通过飞书通知所有者需要手动干预</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div>
                <h2 className="text-2xl font-semibold mb-6">安装与配置</h2>
                <div className="bg-bg-secondary border border-border-color rounded-lg p-6">
                  <CodeBlock 
                    code={`# 从 ClawHub 安装
clawhub install ai-mother

# 或手动克隆
git clone <repo-url> ~/.openclaw/skills/ai-mother
cd ~/.openclaw/skills/ai-mother

# 安装 Python 依赖
pip3 install -r requirements.txt

# 运行设置向导
./scripts/setup.sh`}
                  />
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">获取飞书 open_id</h3>
                  <ol className="list-decimal list-inside space-y-2 text-text-secondary">
                    <li>在飞书上向您的 OpenClaw 机器人发送任意消息</li>
                    <li>运行: <code className="bg-bg-tertiary px-2 py-0.5 rounded text-sm">openclaw logs --tail 20 | grep 'ou_'</code></li>
                    <li>查找: <code className="bg-bg-tertiary px-2 py-0.5 rounded text-sm">received message from ou_xxxxx</code></li>
                    <li>复制 <code className="bg-bg-tertiary px-2 py-0.5 rounded text-sm">ou_xxxxx</code> 字符串</li>
                  </ol>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold mb-6">使用方法</h2>

                <div className="space-y-4">
                  <div className="bg-bg-secondary border border-border-color rounded-xl p-5 hover:border-primary/30 transition-colors">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary text-sm">1</span>
                      手动巡逻
                    </h3>
                    <CodeBlock code="~/.openclaw/skills/ai-mother/scripts/patrol.sh" />
                  </div>

                  <div className="bg-bg-secondary border border-border-color rounded-xl p-5 hover:border-primary/30 transition-colors">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary text-sm">2</span>
                      自动修复问题
                    </h3>
                    <CodeBlock 
                      code={`# 检查并修复所有代理
~/.openclaw/skills/ai-mother/scripts/health-check.sh

# 修复特定代理
~/.openclaw/skills/ai-mother/scripts/auto-heal.sh <PID>`}
                    />
                  </div>

                  <div className="bg-bg-secondary border border-border-color rounded-xl p-5 hover:border-primary/30 transition-colors">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary text-sm">3</span>
                      查看仪表盘
                    </h3>
                    <CodeBlock code="~/.openclaw/skills/ai-mother/scripts/dashboard.sh" />
                  </div>

                  <div className="bg-bg-secondary border border-border-color rounded-xl p-5 hover:border-primary/30 transition-colors">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary text-sm">4</span>
                      性能分析
                    </h3>
                    <CodeBlock 
                      code={`# 所有代理
~/.openclaw/skills/ai-mother/scripts/analytics.py

# 特定代理
~/.openclaw/skills/ai-mother/scripts/analytics.py <PID>`}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link href="https://clawhub.ai/guguoyi/ai-mother" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all duration-300 group/btn">
                <span>在 ClawHub 上查看</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5a2.25 2.25 0 00-2.25-2.25h-4.5M16.5 6a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zM18 18.75h.007v.008H18V18.75z" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
};

export default AIMotherPage;
