const { default: Image } = require("next/image");
const { useEffect, useState } = require("react");

const fallbackImage =
  "https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png";

const ImageWithFallback = ({
  fallback = fallbackImage,
  alt,
  src,
  ...props
}) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
  }, [src]);

  return (
    <Image
      alt={alt}
      onError={setError}
      src={error ? fallbackImage : src}
      {...props}
      fill
      style={{
        objectFit: "cover",
      }}
      sizes="100%"
      className="object-cover transition duration-500 ease-in-out transform group-hover:scale-105"
    />
  );
};

export default ImageWithFallback;
