import { cn } from "@/utils"
import Lottie from "lottie-react";
import uploading from "./uploading.json";


interface FileCardProps {
  file: any
  onRemove: () => void,
  isUploading?: boolean
}

const FileCard = ({ file, onRemove, isUploading }: FileCardProps) => {
  return (
    <div className="relative flex items-center gap-2 py-5 px-4 border border-[var(--common-white-one)] rounded-xl bg-[#131517] hover:bg-[#212227]">
      <div className="flex flex-1 gap-1 items-center">
        {
          isUploading
            ? <>
              {
                file.status == "done" ? <img
                  src="/agentHub/completed-icon.svg"
                  alt={file.file.name}
                  width={20}
                  height={20}
                  loading="lazy"
                  className="aspect-square shrink-0 object-cover"
                />
                  : <Lottie animationData={uploading} loop={true} className="size-5" />
              }
              <p className={
                cn(
                  "text-[#8FA0C2] text-sm",
                  file.status == "done" && "text-[#23EB9B]"
                )
              }
              >
                {file.file.name}
              </p>
            </>
            : <>
              <img
                src="/agentHub/file.svg"
                alt={file.name}
                width={20}
                height={20}
                loading="lazy"
                className="aspect-square shrink-0 object-cover"
              />
              <p className="text-[var(--common-white-seven)] text-sm"
              >
                {file.path}
              </p>
            </>

        }

      </div>
      <div className="flex items-center">
        <img
          src="/agentHub/close-icon.svg"
          alt={file.name}
          width={14}
          height={14}
          loading="lazy"
          onClick={onRemove}
          className="aspect-square shrink-0 object-cove cursor-pointer"
        />
      </div>
    </div>
  )
}

export default FileCard