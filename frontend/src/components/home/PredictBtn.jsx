function PredictBtn({
  onPredict,
  file,
  fileName,
  isChecked,
  commentCol,
  timestampCol,
}) {
  return (
    <button
      onClick={onPredict}
      className={`p-3 rounded-xl ${
        file &&
        fileName &&
        commentCol !== "" &&
        (!isChecked || timestampCol !== null)
          ? "text-white bg-blue-500 hover:bg-blue-700 cursor-pointer"
          : "text-gray-500 bg-gray-200 cursor-not-allowed disabled"
      } `}
    >
      Predict
    </button>
  );
}

export default PredictBtn;
