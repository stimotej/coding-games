import Image from "next/image";

const SelectImage = ({ className, title, subtitle, src, alt, onChange }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <label
        htmlFor="selectImage"
        className="block relative cursor-pointer h-[100px] w-[100px] bg-gray-100 dark:bg-secondary-light rounded-full"
      >
        <Image
          src={src}
          alt={alt}
          layout="fill"
          objectFit="contain"
          className="rounded-full"
        />
      </label>
      {title || subtitle ? (
        <div className="ml-4">
          <h4 className="dark:text-white font-semibold">{title}</h4>
          <p className="dark:text-gray-500 mt-1">{subtitle}</p>
        </div>
      ) : (
        <></>
      )}
      <input
        id="selectImage"
        type="file"
        accept="image/*"
        onChange={(e) => {
          onChange(e.target.files[0], e);
        }}
        className="hidden"
      />
    </div>
  );
};

export default SelectImage;
