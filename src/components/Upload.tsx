import React, { useState, useCallback } from "react";
import styled from "styled-components";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Typography, Button } from "@material-ui/core";

import { useDropzone } from "react-dropzone";
import img from "./image.svg";

const StyledTypography = styled(Typography)`
  font-family: Poppins;
`;

const MainImage = styled.img`
  padding: 0px 80px;
`;

const DashedFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: dashed 1px blue;
  height: 300px;
  align-items: center;
  margin-top: 8px;
  background: #f6f8fb;
  border: 1px dashed #97bef4;
  box-sizing: border-box;
  border-radius: 12px;
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
        <StyledTypography variant="h6">Upload your image</StyledTypography>
        <DashedFrame {...getRootProps()}>
          <MainImage src={img}></MainImage>
          <input {...getInputProps()} />
          {myFiles.length === 0 ? (
            <>
              <InputText>Drag&Drop your images here</InputText>
            </>
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
        <StyledButton
          disabled={!clickable}
          type="submit"
          variant="contained"
          fullWidth
          style={{ marginTop: "16px" }}
          onClick={() => handleUpload(acceptedFiles)}
        >
          upload
        </StyledButton>
      </CardContent>
    </Card>
  );
};
export default Upload;
