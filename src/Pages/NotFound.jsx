const NotFoundContainer = {
  display: 'grid',
  placeItems: 'center',
  height: 'calc(100vh - 360px)',
};

export const NotFound = () => {
  return (
    <div style={NotFoundContainer}>
      <h1>404 Page Not Found!</h1>
    </div>
  );
};
