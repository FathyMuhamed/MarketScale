import { useQuery } from '@apollo/client';
import Spinner from './Spinner';
import { GET_PROJECTS } from './../graphql/queries/projectQueries';
import ProjectCard from './ProjectCard';
export default function Projects() {

  const { loading, data, error } = useQuery(GET_PROJECTS)
  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong </p>;
  return <>
    {
      data.projects.length > 0 ? (
        <div className='row mt-4'>
          {data.projects.map(project => <ProjectCard key={project.id}
            project={project} />)}
        </div>
      ) : (<p> No Projects</p>)
    }
  </>
}
