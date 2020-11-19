import React, { useState, useCallback } from "react";
import styled from "styled-components";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Typography, Button } from "@material-ui/core";

import { useDropzone } from "react-dropzone";
import img from "./image.svg";

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
  border: dashed 1px blue;
  height: 220px;
  width: 332px;
  align-items: center;
  margin-top: 30px;
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
      // TODO api接続処理
    } catch (error) {
      alert(error);
    }
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
                // TODO upload画像表出処理
                <React.Fragment key={file.name}>
                  <InputText key={file.name}>{file.name}</InputText>
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
