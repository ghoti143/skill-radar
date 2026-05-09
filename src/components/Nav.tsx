'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    pathname === href
      ? 'px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white'
      : 'px-4 py-2 rounded-md text-sm font-medium text-gray-500 border border-gray-200 hover:border-gray-400 hover:text-gray-700';

  return (
    <nav className="border-b border-gray-200 px-6 py-3 flex items-center gap-2">
      <span className="font-bold text-[15px] mr-4">Dev Skill Radar</span>
      <Link href="/jobs" className={linkClass('/jobs')}>Jobs</Link>
      <Link href="/chat" className={linkClass('/chat')}>Chat</Link>
    </nav>
  );
}
