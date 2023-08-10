import { useRouter, usePathname } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import Image from 'next/legacy/image'
import fr from '#/public/fr.jpg'
import en from '#/public/en.png'

const Footer = () => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (locale) => {
        const currentPath = pathname;
        if (currentPath) {
          i18n.changeLanguage(locale);
        }
    }

  return (
    <div className="footer">
    <button className="flag-button" onClick={() => handleLocaleChange('en')}>
      <Image 
      alt="English"
      src={en.src}
      width={40}
      height={40}
      />
    </button>
    <button className="flag-button" onClick={() => handleLocaleChange('fr')}>
    <Image 
      alt="French"
      src={fr.src}
      width={40}
      height={40}
      />
    </button>
   
  </div>
  );
};

export default Footer;