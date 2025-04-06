const delay = async (time: number = 5000) => {
  console.log(`Manual delay function for ${time} seconds`);
  await new Promise((res) => setTimeout(res, time));
};

export default delay;
