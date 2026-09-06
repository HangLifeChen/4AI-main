"use client"

import Dropzone from "react-dropzone"
import { cn } from "@/utils"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react"
import FileCard from "./file-item"
import { FileUploaderProps } from "@/types/agent-types"
import { FileManage } from '@/utils';

const FileUploader = (props: FileUploaderProps, ref) => {
  const {
    value: valueProp,
    multiple = true,
    className,
    checkReadStatus,
    ...dropzoneProps
  } = props
  useImperativeHandle(
    ref,
    () => ({
      upload: () => uploadMethod(),
      reset: () => resetMethod()
    })
  )

  const [isUploading, setIsUploading] = useState(false)
  const [uploadingList, setUploadingList] = useState<any>()
  const [displayList, setDisplayList] = useState<any>()
  const [progressValue, setProgress] = useState(0)
  const [doneNum, setDoneNum] = useState(0)
  const uploadListRef = useRef(uploadingList)
  const cancelUploadRef = useRef<() => void>(() => { });


  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const updatedFiles = displayList ? [...displayList, ...acceptedFiles] : acceptedFiles
      setDisplayList(updatedFiles)
      checkReadStatus(updatedFiles.length, updatedFiles[0].name)
    },
    [displayList, multiple, setDisplayList]
  )

  const getStr = (path: string) => {
    if (path[0] == ".") {
      return "/"
    }
    const lastSlashIndex = path.lastIndexOf('/');
    return lastSlashIndex !== -1 ? path.substring(0, lastSlashIndex) : path;
  }


  const onRemove = (index: number) => {
    if (!uploadingList) return
    if (isUploading) {
      cancelUploadRef.current()
      setIsUploading(false)
    }
    const newFiles = displayList.filter((_, i) => i !== index)
    setDisplayList(newFiles)
    checkReadStatus(newFiles.length, newFiles[0].name)
  }

  const resetMethod = () => {
    setUploadingList([])
    setDoneNum(0)
    setIsUploading(false)
  }

  const uploadMethod = () => {
    setIsUploading(true)
    return new Promise((resolve, reject) => {
      const { cancelUploadAll } = FileManage.uploadFiles(displayList!, {
        onChange: fileList => {
          uploadListRef.current = fileList
          setUploadingList([...fileList])
          const filterArr = fileList.filter(item => item.status == "done")
          setDoneNum(filterArr.length)
          setProgress(Math.round(filterArr.length / fileList.length * 100))
        },
        onComplete: () => {
          const finalArr = uploadListRef.current.map((item) => {
            const { path, name, size } = item.file
            const getPath = getStr(path)
            return {
              file_path: getPath,
              hash: item.hash,
              file_name: name,
              file_size: size
            }
          })
          setDisplayList(null)
          resolve(finalArr)
        }
      });
      cancelUploadRef.current = cancelUploadAll!;
    })
  }

  const renderDisplay = () => {
    if (isUploading && uploadingList.length > 0) {
      return <ScrollArea className="h-fit w-full px-3">
        <div className="flex max-h-[400px] flex-col gap-4">
          {
            uploadingList.map((file, index) => (
              <FileCard
                key={index}
                file={file}
                isUploading={isUploading}
                onRemove={() => onRemove(index)}
              />
            ))
          }
        </div>
      </ScrollArea>
    }
    if (!isUploading && displayList?.length > 0) {
      return <ScrollArea className="h-fit w-full px-3">
        <div className="flex max-h-[400px] flex-col gap-4">
          {
            displayList.map((file, index) => (
              <FileCard
                key={index}
                file={file}
                isUploading={isUploading}
                onRemove={() => onRemove(index)}
              />
            ))
          }
        </div>
      </ScrollArea>
    }

  }

  return (
    <div className="flex flex-col gap-5">

      {
        isUploading && <div className="flex flex-col gap-[14px]">
          <span className="text-sm text-[var(--common-white-six)]">Uploading {doneNum} of {uploadingList?.length} files</span>
          <Progress value={progressValue} className="w-full h-[7px] bg-[#17181C]" />
        </div>
      }

      <div className="relative flex flex-col gap-6 overflow-hidden">
        {
          !isUploading && <Dropzone
            onDrop={onDrop}
            multiple={multiple}
          >
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div
                {...getRootProps()}
                className={cn(
                  "group relative grid h-52 w-full cursor-pointer place-items-center rounded-2xl border-1 border-dashed border-[var(--common-white-four)] px-5 py-2.5 text-center transition hover:bg-[#17181C] hover:border-[var(--common-white-two)]]",
                  "ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2",
                  isDragActive && "border-primary bg-[rgba(39,230,255,0.10)]",
                  className
                )}
                {...dropzoneProps}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                  <img src="/agentHub/upload-icon.svg" alt="upload" className="w-[50px] h-[50px]" />
                  <p className={cn(
                    "text-sm",
                    isDragActive ? "text-primary" : "text-[var(--common-white-six)]"
                  )}>
                    Drag files/folders here or click to browse from your computer.
                  </p>
                </div>
              </div>
            )}
          </Dropzone>
        }
        {
          renderDisplay()
        }
      </div>
    </div>
  )
}

export default forwardRef(FileUploader)