function Shuffle(arr) {
  let list = [0, 1, 2, 3];
  let listSwap = list.sort(() => Math.random() - 0.5);
  let newArr = [];
  for (let i of listSwap) {
    newArr.push(arr[listSwap[i]]);
  }
  return newArr;
}

export default Shuffle;
