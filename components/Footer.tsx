import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex justify-center items-center min-h-[53px] backdrop-blur-md border-t py-3 px-5 mt-auto">
      <p className="text-sm">
        &copy; 2025{" "}
        <Link
          href="https://www.github.com/mohamedaridah"
          target="_blank"
          className="hover:underline hover:text-primary font-semibold"
        >
          @fedlover
        </Link>
        . BSTS &trade; All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
