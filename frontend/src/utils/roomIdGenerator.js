const roomIdGenerator = () => {
  const roomIdLength = 10;
  const secret =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_/";
  let roomId = "";
  for (let i = 0; i < roomIdLength; i++) {
    roomId += secret[Math.floor(Math.random() * 64)];
  }
  return roomId;
};

export default roomIdGenerator;
