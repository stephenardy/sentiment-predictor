import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import Header from "../components/home/Header";
import InputFile from "../components/home/InputFile";
import PredictBtn from "../components/home/PredictBtn";
import ColumnDetail from "../components/home/ColumnDetail";

function Home({ setResults }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [commentCol, setCommentCol] = useState("");
  const [timestampCol, setTimestampCol] = useState(null);

  const navigate = useNavigate();

  const handlePredict = async () => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("column_name", commentCol);
    if (timestampCol !== null) {
      formData.append("time_stamp", timestampCol);
    }

    try {
      const res = await api.post("/", formData);
      setResults(res.data);
      navigate("/result");
    } catch (error) {
      console.error("Error posting file", error);
    }
  };

  const handleUploadFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  return (
    <>
      <Header />

      <div className="flex flex-col items-center gap-4">
        <div className="w-2/3 flex flex-col items-end h-fit p-4 gap-2 bg-white rounded-2xl shadow-xl">
          <InputFile onUploadFile={handleUploadFile} />
          {file && fileName && (
            <p className="w-fit font-light text-sm text-gray-500 hover:text-black hover:underline">
              {fileName}
            </p>
          )}
        </div>
        {file && fileName && (
          <div className="flex items-center w-2/3 h-fit p-4 gap-2 bg-white rounded-2xl shadow-xl justify-between">
            <ColumnDetail
              isChecked={isChecked}
              commentCol={commentCol}
              timestampCol={timestampCol}
              setIsChecked={setIsChecked}
              setCommentCol={setCommentCol}
              setTimestampCol={setTimestampCol}
            />

            <PredictBtn
              file={file}
              fileName={fileName}
              isChecked={isChecked}
              commentCol={commentCol}
              timestampCol={timestampCol}
              onPredict={handlePredict}
            />
          </div>
        )}
        {/* <div className="w-2/3">
          <h3 className="font-bold text-sm">Preview</h3>
        </div> */}
      </div>
    </>
  );
}

export default Home;
