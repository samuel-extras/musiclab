/* eslint-disable no-nested-ternary */
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Loader, Error, RelatedSongs, DetailsHeader } from '../components';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import {
  useGetRelatedSongsQuery,
  useGetSongDetailsQuery,
} from '../redux/services/shazamCore';

const SongDetails = () => {
  const { songid } = useParams();
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const {
    data: songData,
    isFetching: isFetchingSongDetails,
    error: songDataError,
  } = useGetSongDetailsQuery({ songid });
  const {
    data,
    isFetching: isFetchingRelatedSongs,
    error: relatedSongsError,
  } = useGetRelatedSongsQuery({ songid });

  const handlePause = () => {
    dispatch(playPause(false));
  };
  const handlePlay = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  if (isFetchingRelatedSongs || isFetchingSongDetails)
    return <Loader title="searching song details" />;

  if (songDataError || relatedSongsError) return <Error />;
  return (
    <div>
      <DetailsHeader songData={songData} />
      <div className="w-full sm:h-16 h-8" />

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
        <div className="mt-5">
          {songData?.sections[1].type === 'LYRICS' ? (
            songData?.sections[1].text.map((line, i) => (
              <p key={i} className="text-gray-400 text-base my-1">
                {line}
              </p>
            ))
          ) : songData?.sections[1].type === undefined ? (
            <p className="text-gray-400 text-base my-1">
              sorry no lyrics found
            </p>
          ) : (
            <p className="text-gray-400 text-base my-1">
              sorry no lyrics found
            </p>
          )}
        </div>
      </div>
      <RelatedSongs
        data={data}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePause={handlePause}
        handlePlay={handlePlay}
      />
    </div>
  );
};

export default SongDetails;
