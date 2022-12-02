/* eslint-disable comma-dangle */
import { useSelector, useDispatch } from 'react-redux';
import { Error, Loader, SongCard } from '../components';

import { genres } from '../assets/constants';
import { useGetSongByGenreQuery } from '../redux/services/shazamCore';
import { selectGenreListId } from '../redux/features/playerSlice';

const Discover = () => {
  const { activeSong, isPlaying, genreListId } = useSelector(
    (state) => state.player
  );
  const dispatch = useDispatch();
  const { data, isFetching, error } = useGetSongByGenreQuery(
    genreListId || 'POP'
  );

  const genreTitle = genres.find(({ value }) => value === genreListId)?.title;

  if (isFetching) return <Loader title="Song Loading ..." />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <div className="w-full flex flex-col justify-between items-center mt-4 mb-10 md:flex-row">
        <h2 className=" font-bold text-3xl text-white text-left">
          Discover {genreTitle}
        </h2>
        <select
          onChange={(e) => {
            dispatch(selectGenreListId(e.target.value));
          }}
          value={genreListId || 'POP'}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none mt-5 sm:mt-0 "
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>{' '}
      <div className="flex flex-wrap items-center justify-center gap-1 md:gap-4  ">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            i={i}
            activeSong={activeSong}
            isPlaying={isPlaying}
            data={data}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
