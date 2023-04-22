import React from "react";
import { Row, Col } from "antd";
import RightContent from "./RightContent";

const HeaderComp: React.FC = () => {
  //   const [color, setColor] = useState("#247fff");
  //   const onChange = (e: any) => {
  //     console.log("value: ", e.target.value);
  //     setColor(e.target.value);
  //   };
  return (
    <Row justify="space-between" align="middle">
      <Col>
        <span>react-template-admin</span>
      </Col>
      <RightContent />
    </Row>
  );
};

export default HeaderComp;
