/**
 * Händler-Logos für logo-cloud-15 – die echten, transparenten PNGs des Shops,
 * bewusst in Originalfarben (kein Graustufen-/Opacity-Filter).
 */
type LogoImgProps = { src: string; alt: string };

function LogoImg({ src, alt }: LogoImgProps) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      draggable={false}
      className="mr-10 h-9 w-auto shrink-0 object-contain sm:h-11"
    />
  );
}

export const Logo01 = () => <LogoImg src="/logo-1.png" alt="Amazon" />;
export const Logo02 = () => <LogoImg src="/logo-2.png" alt="SHOP APOTHEKE" />;
export const Logo03 = () => <LogoImg src="/logo-3.png" alt="dm" />;
export const Logo04 = () => <LogoImg src="/logo-4.png" alt="APOTHEKE" />;
export const Logo05 = () => <LogoImg src="/logo-5.png" alt="healthrise" />;
