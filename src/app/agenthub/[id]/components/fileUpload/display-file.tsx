"use client"
import CommitDialog from "../commit-dialog";
import { getFileStruct, getDownloadHash, getCommitLogs } from "../../../request";
import { useParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import { buildTree, filterTree } from "@/utils/convert-tree";
import { FileManage, formatTimeAgo } from "@/utils";
import { formatFileSize } from "@/utils/file-download";
import { Img as Avatar } from "@/components/common/img";
import { isMobile } from "@/utils";

type PathType = {
  id: number,
  path: string
}

interface IProps {
  agentName: string,
  userName: string,
  userPhoto: string,
  version: number,
  flag: boolean,
  changeUpload: (flag: boolean) => void
}

const DisplayFile = ({ agentName, userName, flag, changeUpload, userPhoto, version }: IProps) => {

  const { id } = useParams();
  const [tree, setTree] = useState<any>();
  const [displayData, setDisplayData] = useState<any>([]);
  const [curFolder, setCurFolder] = useState<PathType[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [jumpCommits, setJumpCommits] = useState(false);
  const [commits, setCommits] = useState({
    count: 0,
    list: []
  });

  const getCommits = async () => {
    const res = await getCommitLogs({
      repo_id: Number(id),
      cur_page: 1,
      page_size: 30
    });
    if (res.code == 0) {
      setCommits(res.data)
    }
  }

  const getAllFile = async () => {
    const res = await getFileStruct({
      repo_id: Number(id)
    });
    if (res.code == 0) {
      const convertData = buildTree(res.data)
      setTree(convertData)
      setDisplayData(convertData)
    }
  }

  const saveThePath = (id: number, name: string) => {
    setCurFolder([...curFolder, { id, path: `/${name}` }])
  }

  const breadCrumbs = (id: number, index: number) => {

    if (index == curFolder.length - 1) {
      return
    }
    const findTarget = filterTree(tree, id)
    setDisplayData(findTarget.children);
    setCurFolder(curFolder.slice(0, index + 1))
  }

  const displayCommits = () => {
    if (isMobile()) {
      setJumpCommits(true)
    } else {
      setIsOpen(true)
    }
  }

  const changeFolder = async (id: number, type: string, name: string, hash: string) => {
    if (type === 'dir') {
      const res = filterTree(tree, id)
      if (res.children.length > 0) {
        saveThePath(res.id, res.file_name)
        setDisplayData(res.children)
      }
    } else {
      const getHash = hash || (await getDownloadHash({ file_id: id })).data.hash;
      await FileManage.download(getHash, name)
    }
  }

  const downloadFile = async (id: number, name: string, hash: string) => {
    const getHash = hash || (await getDownloadHash({ file_id: id })).data.hash;
    await FileManage.download(getHash, name)
  }

  const backTohome = () => {
    setCurFolder([])
    if (jumpCommits) {
      setJumpCommits(false)
    }
    setDisplayData(tree)
  }

  useEffect(() => {
    getAllFile();
  }, [])

  useEffect(() => {
    if (jumpCommits) {
      getCommits()
    }
  }, [jumpCommits])

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4 md:flex-row md:gap-0 justify-between">
        <div className="">

          <div className="flex">
            <span className="font-medium cursor-pointer" onClick={backTohome}>{agentName}/</span>
            <div className="text-[var(--common-white-seven)]">
              {
                curFolder.map((item: PathType, index: number) => <span key={item.id} className="cursor-pointer hover:text-primary" onClick={() => breadCrumbs(item.id, index)}>{index == 0 ? `${item.path.slice(1)}` : `${item.path}`}</span>)
              }
            </div>
          </div>
        </div>

        <div className="flex gap-4 items-center">

          {
            !jumpCommits &&
            <div className="cursor-pointer border border-[var(--common-white-two)] px-5 py-[9px] rounded-[70px] text-[15px] flex items-center gap-1"
              onClick={displayCommits}
            >
              <img
                width={20}
                height={20}
                src="/agentHub/clock.svg"
                alt="clock"
              />
              <span className="text-[var(--common-white-six)]">
                History:
              </span>
              <span className="font-medium">
                {version} commits
              </span>
            </div>
          }
          <CommitDialog isOpen={isOpen} setIsOpen={setIsOpen} />

          {
            flag &&
            <div className="hidden bg-primary w-[123px] h-[38px] rounded-[70px] group overflow-hidden md:flex justify-center items-center text-black text-[15px] font-bold cursor-pointer"
              onClick={() => changeUpload(true)}
            >
              <div className='duration-300 flex flex-col h-full group-hover:translate-y-[-100%]'>
                <div className='h-full flex-shrink-0 flex items-center'>
                  + Add File
                </div>
                <div className='h-full flex-shrink-0 flex items-center'> + Add File</div>
              </div>
            </div>
          }
        </div>
      </div>

      {
        jumpCommits
          ?
          <div className="flex flex-col gap-[6px] pb-4 flex-1 overflow-y-auto">
            {
              commits?.list?.map((item: any) =>
                <div key={item.created_at} className="w-full rounded-[8px] border border-[var(--common-white-one)] bg-black/30 p-[14px] flex flex-col justify-between">
                  <span className="font-medium">{item.commit}</span>
                  <span className="text-[15px] text-[var(--common-white-six)]">{formatTimeAgo(item.created_at)}</span>
                </div>)
            }
          </div>
          : <div className="flex flex-col gap-[2px] w-full rounded-2xl bg-black overflow-hidden">
            <div className="h-[60px] flex items-center justify-between px-5 bg-[#131517]">
              <div className="flex items-center gap-1">
                <Avatar
                  width={20}
                  height={20}
                  src={userPhoto}
                  alt="user"
                />
                <span className="font-semibold">{userName}</span>
              </div>
            </div>

            {
              displayData && displayData.map(item =>
                <div key={item.id} className="group hover:bg-[#212227] bg-[#131517] flex items-center h-[50px] px-5 justify-between text-sm"
                >
                  <div className="flex items-center gap-1 flex-1 cursor-pointer" onClick={() => changeFolder(item.id, item.file_type, item.file_name, item.hash)}>
                    <img
                      width={20}
                      height={20}
                      src={item.file_type == "dir" ? `/agentHub/folder.svg` : `/agentHub/file.svg`}
                      alt="file"
                    />
                    <span className="group-hover:text-primary">{item.file_name}</span>
                  </div>

                  <div className="flex items-center  justify-end md:justify-star gap-1 w-[120px]">

                    {item.file_type == "file" && <>
                      <img
                        width={16}
                        height={16}
                        src="/agentHub/download.svg"
                        alt="download"
                        className="cursor-pointer"
                        onClick={() => downloadFile(item.id, item.file_name, item.hash)}
                      />
                      <span>{formatFileSize(item.file_size)}</span></>}
                  </div>

                  <div className="hidden text-[var(--common-white-six)] flex-1 md:flex justify-center">{item.commit}</div>
                  <div className="hidden md:flex justify-end w-[150px]">{formatTimeAgo(item.updated_at)}</div>

                </div>)
            }
          </div>
      }

    </div>
  )
};

export default DisplayFile;