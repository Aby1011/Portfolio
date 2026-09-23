export interface Project {
  number: string;
  name: string;
  category: string;
  timeline: string;
  stack: string[];
  description: string;
  liveUrl?: string;
  images: {
    leftTop: string;
    leftBottom: string;
    rightTall: string;
  };
}

export const PROJECTS: Project[] = [
  {
    number: '01',
    name: 'CareTrack',
    category: 'Healthcare',
    timeline: 'Feb – Mar 2026',
    stack: ['Python', 'React', 'SQLite'],
    description:
      'Remote healthcare platform with role-based dashboards, alert detection, and QR-based prescription verification.',
    liveUrl: 'https://care-track-tau.vercel.app/',
    images: {
      leftTop: '/assets/caretrack-1.png',
      leftBottom: '/assets/caretrack-2.png',
      rightTall: '/assets/caretrack-3.png',
    },
  },
  {
    number: '02',
    name: 'MyFeeStatus',
    category: 'FinTech',
    timeline: 'Aug – Oct 2025',
    stack: ['Python', 'Django', 'MySQL'],
    description:
      'Fee management system with RBAC, dues tracking, automated receipts, and reporting dashboards.',
    liveUrl: 'https://myfee-status-zeta.vercel.app/',
    images: {
      leftTop: '/assets/myfee-1.png',
      leftBottom: '/assets/myfee-2.png',
      rightTall: '/assets/myfee-3.png',
    },
  },
];

