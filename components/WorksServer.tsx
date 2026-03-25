import { getProjects } from '@/lib/services/projects';
import WorksDynamic from './WorksDynamic';

export default async function WorksServer() {
  const projects = await getProjects();
  return <WorksDynamic initialProjects={projects} />;
}
