import { loader } from '../assets';

const Loader = ({ title }) => (
  <div className="w-full h-[100vh] flex flex-col justify-center items-center">
    <img src={loader} alt="loader" className="w-32 h-32 object-contain" />
    <h2 className=" font-bold text-white text-2xl mt-2">
      {title || 'loading ...'}
    </h2>
  </div>
);

export default Loader;
