import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import PlayPause from './PlayPause';

import 'swiper/css';
import 'swiper/css/free-mode';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

const TopChartCard = ({
  song,
  i,
  isPlaying,
  activeSong,
  handlePause,
  handlePlay,
}) => (
  <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
    <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
    <div className="flex flex-row flex-1 min-w-0 justify-between items-center">
      <img src={song?.images?.coverart} className="w-16 h-16 rounded-lg" />
      <div className="flex flex-col flex-grow justify-center mx-3 truncate min-w-0">
        <Link to={`/songs/${song?.key}`}>
          <p className="text-lg font-bold text-white break-all truncate">
            {song?.title}
          </p>
        </Link>
        <Link to={`/songs/${song?.artists[0].adamid}`}>
          <p className="text-sm text-gray-300 mt-1 block break-all text-ellipsis truncate">
            {song?.subtitle}
          </p>
        </Link>
      </div>
    </div>
    <div className="inline-block">
      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        i={i}
        handlePause={handlePause}
        handlePlay={handlePlay}
      />
    </div>
  </div>
);

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  const topPlays = data?.slice(0, 5);

  const handlePause = () => {
    dispatch(playPause(false));
  };
  const handlePlay = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };
  return (
    <div
      ref={divRef}
      className="flex flex-col ml-0 mb-4 flex-1 overflow-y-auto max-w-full xl:ml-6 xl:mb-0 xl:max-w-[400px]"
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-xl">Top Charts</h2>
          <Link className="mr-6 md:mr-0" to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard
              key={song?.key}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePause={handlePause}
              handlePlay={() => handlePlay(song, i)}
            />
          ))}
        </div>
      </div>
      <div>
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>
        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlays?.map((song) => (
            <SwiperSlide
              key={song?.key}
              style={{ width: '25%', height: 'auto' }}
              className="shadow-lg rounded-full animate-slideright"
            >
              <Link to={`/artists/${song?.artists[0].adamid}`}>
                <img
                  src={song?.images?.background}
                  alt="artist"
                  className="rounded-full object-cover w-full"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
