import Image from 'next/image';

export const Logo = () => {
  return (
    <Image
      src="/oams_logo.png" // Path to your logo image
      alt="Logo"
      width={32} // Adjust the size as needed
      height={32} // Adjust the size as needed
    />
  );
};
