import React, { useState, useCallback } from "react";
import styled from "styled-components";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Typography, Button } from "@material-ui/core";

import { useDropzone } from "react-dropzone";
import img from "./image.svg";

const DashedFrame = styled.div`
  display: flex;
  border: dashed 1px blue;
  padding-left: 32px;
  padding-right: 32px;
  height: 128px;
  align-items: center;
  margin-top: 8px;
  background-image: url(${img});
  background-repeat: no-repeat;
`;

const Wrapper = styled.div`
  display: flex;
`;

type Props = {
  className?: string;
};

const Upload: React.FC<Props> = ({ className }: Props) => {
  const [myFiles, setMyFiles] = useState<File[]>([]);
  const [clickable, setClickable] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (!acceptedFiles[0]) return;

    try {
      setMyFiles([...acceptedFiles]);
      setClickable(true);
    } catch (error) {
      alert(error);
    }
  }, []);

  const onDropRejected = () => {
    alert("画像のみ受け付けることができます。");
  };

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    onDropRejected,
  });

  const handleClear = () => {
    setMyFiles([]);
    setClickable(false);
  };

  const handleUpload = async (accepterdImg: any) => {
    console.log("受け取った画像 :", accepterdImg);
    try {
      // TODO 画像受け取り処理
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Upload your image</Typography>
        <DashedFrame {...getRootProps()}>
          <input {...getInputProps()} />
          {myFiles.length === 0 ? (
            <div>
              <div>Drag&Drop your images here</div>
            </div>
          ) : (
            <Wrapper>
              {myFiles.map((file: File) => (
                <React.Fragment key={file.name}>
                  <div>choose a file</div>
                  <div key={file.name}>{file.name}</div>
                </React.Fragment>
              ))}
            </Wrapper>
          )}
        </DashedFrame>
        <Button
          disabled={!clickable}
          type="submit"
          variant="contained"
          fullWidth
          style={{ marginTop: "16px" }}
          onClick={() => handleUpload(acceptedFiles)}
        >
          upload
        </Button>
        <Button
          type="button"
          variant="contained"
          color="secondary"
          fullWidth
          style={{ marginTop: "16px" }}
          onClick={() => handleClear()}
        >
          clear
        </Button>
      </CardContent>
    </Card>
  );
};
export default Upload;
