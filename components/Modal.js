import { useEffect } from "react";
import { MdClose } from "react-icons/md";

const Modal = ({
  visible,
  setVisible,
  title,
  content,
  actionText,
  onClick,
}) => {
  useEffect(() => {
    if (visible) {
      window.onscroll = () => {
        window.scroll(0, 0);
      };
    } else {
      window.onscroll = () => {};
    }
  }, [visible]);

  if (visible)
    return (
      <>
        <div
          className="fixed top-0 left-0 flex z-10 items-center justify-center w-screen h-screen bg-black/50"
          onClick={() => setVisible(false)}
        ></div>
        <div className="flex flex-col fixed w-1/3 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white dark:bg-secondary p-6 z-20">
          <div className="flex items-center justify-between">
            <h3 className="dark:text-white text-xl font-semibold">{title}</h3>
            <button
              className="p-2 hover:bg-gray-100 dark:hover:bg-secondary-light rounded-full pointer-events-auto"
              onClick={() => setVisible(false)}
            >
              <MdClose size={22} className="dark:text-white" />
            </button>
          </div>
          <div className="text-gray-600 dark:text-gray-400 mt-4 mb-6 flex-1">
            {content}
          </div>
          {actionText ? (
            <div className="flex items-center justify-end">
              <button
                className="flex flex-row items-center mr-2 py-2 px-5 rounded-full dark:text-white bg-gray-100 dark:bg-secondary-light hover:bg-gray-200 dark:hover:bg-secondary-light/50"
                onClick={() => setVisible(false)}
              >
                Cancel
              </button>
              <button
                className="flex flex-row items-center py-2 px-5 rounded-full dark:text-white bg-gray-100 dark:bg-secondary-light hover:bg-gray-200 dark:hover:bg-red-400"
                onClick={onClick}
              >
                {actionText}
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </>
    );
};

export default Modal;
