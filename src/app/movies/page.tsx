import Movies from '~/app/_ui/moviepage/Movies'
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const MoviesPage = () => {
  // const {userId} = auth()
  // if(!userId) redirect("/")
  return <Movies />;
};

export default MoviesPage;
