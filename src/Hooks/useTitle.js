import { useEffect } from "react";
import PropTypes from "prop-types";

const useTitle = (title) => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    return () => {
      document.title = prevTitle;
    };
  }, [title]);
};

useTitle.prototypes = {
  title: PropTypes.string,
};

useTitle.defaultProps = {
  title: 'The Movie Database (TMDB)',
};

export default useTitle;