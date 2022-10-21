import { useNavigate } from 'react-router-dom';

const ArtistCard = ({ artist }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col w-[160px] sm:w-[200px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
      onClick={() => navigate(`/artists/${artist?.artists[0]?.adamid}`)}
    >
      <img
        className="w-full h-32 sm:h-40 rounded-lg"
        src={artist?.images?.background}
        alt="artist"
      />
      <p className="mt-4 font-semibold text-lg text-white truncate">
        {artist?.subtitle}
      </p>
    </div>
  );
};

export default ArtistCard;
