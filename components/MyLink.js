import Link from "next/link";

const MyLink = ({ children, disabled, ...props }) => {
  if (disabled) return <div {...props}>{children}</div>;
  else return <Link {...props}>{children}</Link>;
};

export default MyLink;
