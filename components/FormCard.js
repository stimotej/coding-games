import Loader from "./Loader";

const FormCard = ({
  id,
  title,
  titleIcon,
  className,
  onSubmit,
  children,
  submitText,
  submitDisabled,
  submitClass,
  status,
  loading,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      className={`border dark:border-0 bg-white dark:bg-secondary rounded-lg p-4 ${className}`}
    >
      <h3 className="flex items-center dark:text-white text-lg">
        {titleIcon}
        <div className={titleIcon ? "ml-2" : ""}>{title}</div>
      </h3>
      <div className="mt-6 flex flex-col gap-3">
        {children}
        <div className="flex items-center justify-between">
          {status || loading ? (
            <div className="dark:text-white">
              {loading ? <Loader /> : status}
            </div>
          ) : (
            <div />
          )}
          <button
            type="submit"
            className={`flex self-end flex-row items-center py-2 px-5 rounded-full dark:text-white bg-gray-100 dark:bg-secondary-light hover:bg-gray-200 dark:hover:bg-secondary-light/50 ${submitClass}`}
            disabled={submitDisabled || loading}
          >
            {submitText}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormCard;
