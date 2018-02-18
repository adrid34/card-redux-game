const persistPlayerName = store => next => (action) => {
  const previousPlayerName = store.getState().player.name;

  // Call the action
  next(action);

  const newPlayerName = store.getState().player.name;

  if (previousPlayerName !== newPlayerName) {
    console.log('Changed local storage');
    localStorage.setItem('reduxPlayerName', newPlayerName);
  }
};

export default persistPlayerName;
