export interface Service {
  number: string;
  name: string;
  description: string;
}

export const SERVICES: Service[] = [
  {
    number: '01',
    name: 'Full Stack Development',
    description:
      'End-to-end web apps with Python, Java, React, and Django — from database to UI.',
  },
  {
    number: '02',
    name: 'Backend Engineering',
    description:
      'Server-side logic, REST APIs, Django ORM, and secure transaction handling.',
  },
  {
    number: '03',
    name: 'Frontend Development',
    description:
      'Responsive UIs with React, HTML5, CSS3, and role-based dashboards.',
  },
  {
    number: '04',
    name: 'Database Design',
    description:
      'MySQL and SQLite schema design, DBMS concepts, and audit trails.',
  },
  {
    number: '05',
    name: 'System Architecture',
    description:
      'RBAC, secure data workflows, OOP, and data structures.',
  },
];
