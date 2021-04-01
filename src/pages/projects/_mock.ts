import { Request, Response } from 'express';
import { ProjectDataType } from './data.d';

const projectNames = [
  'Alipay',
  'Angular',
  'Ant Design',
  'Ant Design Pro',
  'Bootstrap',
  'React',
  'Vue',
  'Webpack',
  'Vite',
  'Esbuild',
  'TypeScript',
  'Stylelint',
  'Echarts',
  'React Native',
  'VScode',
  'Puppeteer',
  'Animate Css',
  'Prettier',
  'Deno',
  'Standard',
  'Egg',
  'Classnames',
  'Ant Design Mobile',
  'React Router',
];

function getProjects(req: Request, res: Response) {
  const projects: ProjectDataType[] = projectNames.map((item, index) => {
    return {
      id: `project${index}`,
      name: item,
      principal: `Admin-${index}`,
    };
  });

  return res.json(projects);
}

export default {
  'GET  /api/projects': getProjects,
};
