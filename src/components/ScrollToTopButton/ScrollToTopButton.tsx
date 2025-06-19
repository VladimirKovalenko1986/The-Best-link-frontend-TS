import { useState, useEffect } from 'react';
import { SlArrowUp } from 'react-icons/sl';
import css from './ScrollToTopButton.module.css';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Відслідковування скролу
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Функція для скролу вгору
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    isVisible && (
      <button onClick={scrollToTop} className={css.scrollButton}>
        <SlArrowUp />
      </button>
    )
  );
};

export default ScrollToTopButton;
