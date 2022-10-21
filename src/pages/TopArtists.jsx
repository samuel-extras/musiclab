import { Error, Loader, ArtistCard } from '../components';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

const TopArtists = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) <Loader title="Loading songs around you..." />;
  if (error) return <Error />;
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white mt-4 mb-10">Top Artists</h2>
      <div className="flex flex-wrap justify-center gap-2">
        {data?.map((artist, i) => (
          <ArtistCard key={artist.key} artist={artist} i={i} />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
