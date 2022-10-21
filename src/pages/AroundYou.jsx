import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Error, Loader, SongCard } from '../components';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';

const AroundYou = () => {
  const [country, setCountry] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data, isFetching, error } = useGetSongsByCountryQuery(country);

  useEffect(() => {
    axios
      .get(
        // eslint-disable-next-line comma-dangle
        `https://geo.ipify.org/api/v2/country?apiKey=at_${
          import.meta.env.VITE_GEO_API_KEY
        }`
      )
      .then((res) => setCountry(res?.data?.location?.country))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [country]);
  console.log(country);
  if (isFetching && isLoading) <Loader title="Loading songs around you..." />;
  if (error && country) return <Error />;
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white mt-4 mb-10">
        Around You {country}
      </h2>
      <div className="flex flex-wrap justify-center gap-4">
        {data?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            i={i}
            data={data}
          />
        ))}
      </div>
    </div>
  );
};

export default AroundYou;
