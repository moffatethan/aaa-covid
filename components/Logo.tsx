import Image from 'next/image';

export const Logo = () => {
  return (
    <div className="w-52">
      <Image src="/logo.png" width={500} height={63} layout="responsive" />
    </div>
  );
};
