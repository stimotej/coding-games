import { MdClose } from "react-icons/md";

const InfoModal = ({ visible, setVisible, title, content, wide }) => {
  if (visible)
    return (
      <>
        <div
          className="fixed top-0 left-0 flex z-10 items-center justify-center w-screen h-screen bg-transparent"
          onClick={() => setVisible(false)}
        ></div>
        <div
          className={`flex flex-col border dark:border-gray-500 shadow-xl shadow-black/20 absolute top-full -left-full rounded-lg bg-white dark:bg-secondary p-4 z-20 ${
            wide ? "w-[400px]" : "w-[300px]"
          }`}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-black dark:text-white text-xl font-semibold">
              {title}
            </h3>
          </div>
          <div className="text-gray-600 dark:text-gray-400 mt-4 mb-6 flex-1">
            {content}
          </div>
        </div>
      </>
    );
};

export default InfoModal;
