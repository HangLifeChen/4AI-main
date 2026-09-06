"use client"
import { useState } from "react";
import DisplayFile from "./fileUpload/display-file";
import UploadFile from "./fileUpload/upload-files";

interface Iprops {
  agentInfo: any,
  flag: boolean
}

const FilesCard = ({ agentInfo, flag }: Iprops) => {

  const [isUpload, setIsUpload] = useState(false);

  return (
    <>
      {
        isUpload
          ? <UploadFile agentName={agentInfo.agentName} changeUpload={setIsUpload}></UploadFile>
          : <DisplayFile version={agentInfo.version} agentName={agentInfo.name} userName={agentInfo.username} userPhoto={agentInfo.user_photo} flag={flag} changeUpload={setIsUpload}></DisplayFile>
      }
    </>
  )
};

export default FilesCard;