import { useEffect } from 'react';
import { FiChevronUp } from 'react-icons/fi';

const ScollToTopButton = () => {
  useEffect(() => {
    const showButtonScroll = () => {
      const scrollY = document.querySelector('body').scrollTop;
      const topPageBtn = document?.querySelector('#top-page-button');
      if (scrollY < 370) {
        topPageBtn?.classList?.add('hidden');
        topPageBtn?.classList?.remove('flex');
      } else {
        topPageBtn?.classList?.add('flex');
        topPageBtn?.classList?.remove('hidden');
      }
    };
    showButtonScroll();
    document.querySelector('body').addEventListener('scroll', showButtonScroll);
    return () => document.querySelector('body').removeEventListener('scroll', showButtonScroll, false);
  }, []);

  return (
    <a
      id="top-page-button"
      className={
        'items-center rounded-full justify-center shadow-lg cursor-pointer transition-all fixed bottom-8 right-8 p-2 z-10 opacity-50 hover:opacity-100 bg-black text-primary hidden'
      }
      onClick={() => {
        document.querySelector('body').scrollTo(0, 0);
      }}
    >
      <FiChevronUp size="1.5rem" />
    </a>
  );
};

export default ScollToTopButton;
