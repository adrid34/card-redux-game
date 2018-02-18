export default function getInitialState() {
  return {
    player: {
      name: localStorage.getItem('reduxPlayerName') || '',
    },
  };
}
