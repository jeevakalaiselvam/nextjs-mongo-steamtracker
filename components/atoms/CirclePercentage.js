import React from "react";
import styled from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60px;
  min-width: 60px;
  transform: translateY(-2px);
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fefefe;
`;

export default function CirclePercentage({
  percentage,
  size,
  textSize,
  trailColor,
  pathColor,
  textCustom,
}) {
  return (
    <Container>
      <div style={{ width: size ?? 75, height: size ?? 75 }}>
        <CircularProgressbar
          strokeWidth={3}
          value={percentage}
          text={`${textCustom ? textCustom : percentage + "%"}`}
          styles={buildStyles({
            textColor: "#FEFEFE",
            trailColor: trailColor ?? "#454545",
            pathColor: pathColor ?? `rgba(255, 255, 255, ${1})`,
            textSize: textSize ?? "20px",
          })}
        />
      </div>
    </Container>
  );
}
