import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { GET_PROJECTS } from '../graphql/queries/projectQueries';
import { DELETE_PROJECT } from '../graphql/mutations/projectMutations';
import { useMutation } from '@apollo/client';

export default function DeleteProjectButton({ projectId }) {
  const Navigate = useNavigate();
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => Navigate('/'),
    refetchQueries: [{ query: GET_PROJECTS }]
  });


  return (
    <div className='d-flex mt-5 ms-auto' >
      <button className='btn btn-danger m-2' onClick={deleteProject}>
        <FaTrash className='icon' /> Delete Project
      </button>
    </div>
  )
}
