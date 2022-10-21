/* eslint-disable no-nested-ternary */
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Loader, Error, RelatedSongs, DetailsHeader } from '../components';
import { useGetArtistDetailsQuery } from '../redux/services/shazamCore';

const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetArtistDetailsQuery(artistId);
  if (isFetching) return <Loader title="Loading artist details" />;

  if (error) return <Error />;
  return (
    <div className="mt-10">
      <DetailsHeader artistData={data} artistId={artistId} />
      <div className="w-full sm:h-8 h-6" />

      <div className="mb-10">
        {!artistId && (
          <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
        )}
      </div>
      <RelatedSongs
        data={Object.values(data?.songs)}
        isPlaying={isPlaying}
        activeSong={activeSong}
        artistid={artistId}
      />
    </div>
  );
};

export default ArtistDetails;
