"use client";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { User } from "@/app/model/user";
import Avatar from "./Avatar";
import FilesIcon from "./ui/icons/FilesIcon";
import Button from "./ui/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import GridSpinner from "./ui/GridSpinner";
import { blob } from "stream/consumers";
type Props = {
  user: User;
};
export default function NewPost({ user }: Props) {
  const [file, setFile] = useState<any>([]);
  const [fileURL, setFileURL] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const textRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileLists: any[] = [];
    fileLists.push(e.target?.files);
    if (
      file.length >= 4 ||
      fileLists[0].length > 4 ||
      file.length + fileLists[0].length > 4
    ) {
      alert("이미지는 최대 4장까지 업로드 가능합니다");
      return;
    }
    let changeFile = [...file, ...fileLists[0]];
    setFile(changeFile);
  };
  const removeImg = (index: number) => {
    let fileUrlList = fileURL;
    fileUrlList.splice(index, 1);
    setFileURL([...fileUrlList]);
    let fileList = [...file];
    fileList.splice(index, 1);
    setFile([...fileList]);
  };
  const handleDrag = (e: React.DragEvent) => {
    if (e.type === "dragenter") {
      setDragging(true);
    } else if (e.type === "dragleave") {
      setDragging(false);
    }
  };
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const fileList: any[] = [];
    fileList.push(e.dataTransfer?.files);
    if (
      file.length >= 4 ||
      fileList[0].length > 4 ||
      file.length + fileList[0].length > 4
    ) {
      alert("이미지는 최대 4장까지 업로드 가능합니다");
      return;
    }
    let changeFile = [...file, ...fileList[0]];
    setFile(changeFile);
  };
  useEffect(() => {
    if (file?.length > 4) {
      return;
    }
    let files = [];
    for (let i = 0; i < file?.length; i++) {
      files.push(URL.createObjectURL(file[i]));
    }
    setFileURL([...files]);
  }, [file]);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    for (let i = 0; i < file.length; i++) {
      formData.append(`files${i}`, file[i]);
    }
    formData.append("content", textRef.current?.value ?? "");

    fetch("/api/posts", { method: "POST", body: formData })
      .then((res) => {
        if (!res.ok) {
          setError(`${res.status} ${res.statusText}`);
          return;
        }
        router.push("/");
      })
      .catch((err) => setError(err.toString()))
      .finally(() => setLoading(false));
  };
  return (
    <>
      <section className="w-full max-w-xl h-[90vh] flex flex-col items-center mt-6">
        {error && (
          <p className="w-full bg-red-100 text-red-600 text-center p-4 mb-4 font-bold">
            {error}
          </p>
        )}
        {loading && (
          <div className="absolute inset-0 z-20 bg-sky-500/20">
            <div className="text-center pt-60">
              <GridSpinner />
            </div>
          </div>
        )}

        <form
          className="w-full flex flex-col h-[90vh] mt-2"
          onSubmit={handleSubmit}
        >
          <input
            type="file"
            id="input-upload"
            accept="image/*"
            className="hidden"
            multiple
            onChange={handleChange}
          />
          <label
            htmlFor="input-upload"
            className={`w-full h-64 p-10 flex flex-col items-center justify-center ${
              !file && "border-2 border-red-200 border-dashed p-10"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <FilesIcon />
            <p className=" text-gray-400 text-center text-base mt-2">
              이미지를 업로드 해주세요 (최대 4장)
            </p>
          </label>
          {file.length > 0 && (
            <div className="flex w-full h-60">
              {fileURL.map((item, index) => (
                <div
                  className="relative w-full h-full max-w-[20vw] aspect-square"
                  key={index}
                >
                  <Image
                    className=""
                    src={item}
                    alt="local file"
                    fill
                    sizes="100px"
                  />
                  <div
                    className=" absolute text-red-900 text-3xl rounded-xl bg-sky-400 border-4"
                    onClick={() => removeImg(index)}
                  >
                    -
                  </div>
                </div>
              ))}
            </div>
          )}
          <textarea
            className="outline-none text-lg border border-neutral-300 mt-4 p-4 mb-2"
            name="text"
            id="input-text"
            rows={10}
            required
            placeholder={"내용을 입력해주세요"}
            ref={textRef}
          ></textarea>
          <Button text="등록" onClick={() => {}} />
        </form>
      </section>
    </>
  );
}
