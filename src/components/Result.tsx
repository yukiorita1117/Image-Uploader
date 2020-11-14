import React from "react";
import styled from "styled-components";

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 344px;
  padding: 0 16px;
`;

type Props = {
  className?: string;
};

const Result: React.FC<Props> = ({ className }: Props) => {
  return <Root className={className}></Root>;
};
export default Result;
