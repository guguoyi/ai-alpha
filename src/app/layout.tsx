import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'AI OO - AI 应用与实践',
  description: '探索 AI 应用与实践的前沿思考，提供 OpenClaw Skill 开发工具和最佳实践',
  keywords: ['AI', 'OpenClaw', 'Skill', 'AI 应用', 'AI 实践', 'AI 工具'],
  authors: [{ name: 'AI OO Team' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}