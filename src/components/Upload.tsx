import React, { useState, useCallback } from "react";
import styled from "styled-components";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Typography, Button } from "@material-ui/core";

import { useDropzone } from "react-dropzone";
import img from "./image.svg";
import firebase, { storage } from "../firebase/firebase";

const StyledTypography = styled(Typography)`
  margin-top: 20px;
  font-family: Poppins;
  font-size: 18px;
`;

const SubText = styled.div`
  margin-top: 16px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 15px;
  text-align: center;
  letter-spacing: -0.035em;
  color: #828282;
`;

const DashedFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 280px;
  width: 332px;
  border: 1px dashed #97bef4;
  border-radius: 12px;
  align-items: center;
  margin-top: 30px;
  background: #f6f8fb;
  box-sizing: border-box;
`;

const InputText = styled.div`
  width: 166.01px;
  height: 17.99px;
  margin-top: 40px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  /* identical to box height */
  letter-spacing: -0.035em;
  color: #bdbdbd;
`;

const Wrapper = styled.div`
  display: flex;
`;

const StyledButton = styled(Button)`
  width: 112px;
`;

const PreviewImageWrapper = styled.div`
  height: 280px;
  width: 332px;
  border: 1px dashed #97bef4;
  border-radius: 12px;
`;

const PreviewImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  object-fit: cover;
`;

type Props = {
  className?: string;
};

const Upload: React.FC<Props> = ({ className }: Props) => {
  const [myFiles, setMyFiles] = useState<File[]>([]);
  const [clickable, setClickable] = useState(false);
  const [src, setSrc] = useState("");

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!acceptedFiles[0]) return;

    try {
      setMyFiles([...acceptedFiles]);
      setClickable(true);
      // test
      handlePreview(acceptedFiles);
    } catch (error) {
      alert(error);
    }
  }, []);

  const onDropRejected = () => {
    alert("画像のみ受け付けることができます。");
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDropRejected,
  });

  // Upload処理
  const [imageUrl, setImageUrl] = useState("");

  const handleUpload = async (accepterdImg: any) => {
    console.log("受け取った画像 :", accepterdImg[0]);
    try {
      // 画像受け取り処理
      // accepterdImg.preventDefault();
      if (accepterdImg === "") {
        alert("ファイルが選択されていません");
      }

      // アップロード処理
      const uploadTask: any = storage
        .ref(`/images/${myFiles[0].name}`)
        .put(myFiles[0]);

      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        next,
        error,
        complete
      );
    } catch (error) {
      console.log("エラーキャッチ", error);
    }
  };

  const next = (snapshot: { bytesTransferred: number; totalBytes: number }) => {
    // 進行中のsnapshotを得る
    // アップロードの進行度を表示
    const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log(percent + "% done");
    console.log(snapshot);
  };

  const complete = async () => {
    // 完了後の処理
    // 画像表示のため、アップロードした画像のURLを取得
    await storage
      .ref("images")
      .child(myFiles[0].name)
      .getDownloadURL()
      .then((fireBaseUrl: React.SetStateAction<string>) => {
        setImageUrl(fireBaseUrl);
      });
  };

  const error = (error: any) => {
    // エラーハンドリング
    console.log(error);
  };

  const handlePreview = (files: any) => {
    if (files === null) {
      return;
    }
    const file = files[0];
    if (file === null) {
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSrc(reader.result as string);
    };
  };

  return (
    <Card>
      <CardContent>
        <StyledTypography variant="h6">Upload your image</StyledTypography>
        <SubText>File should be Jpeg, Png,...</SubText>
        <DashedFrame {...getRootProps()}>
          <input {...getInputProps()} />
          {myFiles.length === 0 ? (
            <>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <img src={img}></img>
              <InputText>Drag&Drop your images here</InputText>
            </>
          ) : (
            <Wrapper>
              {myFiles.map((file: File) => (
                <React.Fragment key={file.name}>
                  <PreviewImageWrapper>
                    {src && <PreviewImage src={src} />}
                  </PreviewImageWrapper>
                  {/* <InputText key={file.name}>{file.name}</InputText> */}
                </React.Fragment>
              ))}
            </Wrapper>
          )}
        </DashedFrame>
        <StyledButton
          disabled={!clickable}
          type="submit"
          variant="contained"
          fullWidth
          style={{ marginTop: "16px" }}
          onClick={() => handleUpload(myFiles)}
        >
          upload
        </StyledButton>
        {/* Upload先のURL */}
        {/* <img src={imageUrl} alt="uploaded" /> */}
      </CardContent>
    </Card>
  );
};
export default Upload;
