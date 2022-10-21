import SongBar from './SongBar';

const RelatedSongs = ({
  data,
  isPlaying,
  activeSong,
  handlePause,
  handlePlay,
  artistid,
}) => (
  <div className="flex flex-col">
    <h1 className="font-bold text-3xl text-white">
      {artistid ? 'Songs' : 'Related Songs'}
    </h1>
    <div className="mt-6   w-full flex flex-col">
      {data?.map((song, i) => (
        <SongBar
          key={`${song.key} ~ ${artistid + i}`}
          song={song}
          i={i}
          artistId={artistid}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePause={handlePause}
          handlePlay={() => handlePlay(song, i)}
        />
      ))}
    </div>
  </div>
);

export default RelatedSongs;
