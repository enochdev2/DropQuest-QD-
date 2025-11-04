import Solanamission from '../assets/solanamission.png';
const SolanaMissionModal = ({isOpen, setIsOpen}) => {

  const closeModal = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 h-[85vh] top-24 ">
      <div className="w-full relative flex flex-col items-center space-y-6 py-8 px-2  max-w-md mx-auto">
        {/* Network Circle Background */}
        <div className=" border-t-2 border-b-2 mt-10 w-full sm:w-[360px] h-54  rounded-sm overflow-hidden ">
          {/* Outer glowing circle with network lines approximation */}
        
          <img src={Solanamission} alt="" className='w-full h-54' />
        </div>


        {/* Button */}
        <button
          // onClick={} // Replace with actual guide/mission handler
          className="px-14 py-1 my-12 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow-xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105 text-base"
        >
          Read the guide and <br/> join the mission
        </button>

         {/* New Mission Text */}
        <h2 className="text-3xl font-bold text-white text-center tracking-wide">
          New Mission !!!
        </h2>

        {/* Close button (optional, small X in corner) */}
        <button
          onClick={closeModal}
          className="absolute top-5 right-8 text-white text-base font-bold hover:text-gray-300 border rounded-sm px-1 focus:outline-none"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default SolanaMissionModal;

// Usage: <SolanaMissionModal />