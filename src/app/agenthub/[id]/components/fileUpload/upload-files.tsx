"use client"
import FileUploader from "./file-uploader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress"
import { useRef, useState } from "react";
import { uploadFile } from "@/app/agenthub/request";
import { useParams } from "next/navigation";
import { addToast } from "@heroui/react";

const UploadFiles = ({ changeUpload, agentName }: { changeUpload: (flag: boolean) => void, agentName: string }) => {

  const [disabled, setDisabled] = useState(true)
  const [inputText, setInputText] = useState("")
  const [bntText, setBtnText] = useState("Commit changes")
  const uploadRef = useRef(null)
  const { id } = useParams()

  const startUpload = async () => {
    setDisabled(true);
    setBtnText("Uploading")
    const arr = await (uploadRef.current as any).upload()
    const res = await uploadFile({
      repo_id: Number(id),
      commit: inputText,
      files: arr
    })
    if (res.code == 0) {
      addToast({ title: "commit chnage successfully!", color: "success" });
      (uploadRef.current as any).reset()
      setInputText("Upload 0 files");
      setBtnText("Commit changes")
      changeUpload(false)
    } else {
      addToast({ title: "commit chnage failed!" });
    }
  }

  const checkReadStatus = (fileLength: number, fileName: string) => {
    if (fileLength === 1) {
      setInputText(`Upload ${fileName}`)
    } else {
      setInputText(`Upload ${fileLength} files`)
    }
    setBtnText("Commit changes")
    setDisabled(false)
  }

  return (
    <div className="flex flex-col gap-5">
      <span className="font-medium text-xl cursor-pointer" onClick={() => changeUpload(false)}>{agentName}/</span>
      <div className="flex flex-col gap-10">
        <FileUploader
          ref={uploadRef}
          checkReadStatus={checkReadStatus}
        />
        <div className="flex flex-col gap-5">
          <span className="text-xl font-medium">Commit Changes</span>
          <Input disabled={disabled} maxLength={50} placeholder="Upload 0 files" className="w-full h-[54px] rounded-xl border-[var(--common-white-two)] bg-[#17181C]" value={inputText} onChange={(e) => setInputText(e.target.value)} />

          <div className="flex gap-5">
            <Button disabled={disabled} className="w-[224px] h-12 rounded-[100px] bg-primary group overflow-hidden font-bold text-[15px]"
              onClick={() => startUpload()}
            >
              <div className='duration-200 h-full group-hover:translate-y-[-100%]'>
                <div className='h-full flex items-center'>{bntText}</div>
                <div className='h-full flex items-center'>{bntText}</div>
              </div>
            </Button>
            <Button variant="outline" className="group overflow-hidden font-bold text-[15px] w-[224px] h-12 rounded-[100px] text-primary border-[var(--common-white-four)] hover:text-primary"
              onClick={() => changeUpload(false)}
            >
              <div className='duration-200 h-full group-hover:translate-y-[-100%]'>
                <div className='h-full flex items-center'>Cancel</div>
                <div className='h-full flex items-center'>Cancel</div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default UploadFiles;