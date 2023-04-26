import React from "react";
import { Row, Col, Typography } from "antd";
import RightContent from "./RightContent";

const { Text } = Typography;

const HeaderComp: React.FC = () => {
  return (
    <Row justify="space-between" align="middle">
      <Col>
        <Text strong style={{ fontSize: 18 }}>
          react-template-admin
        </Text>
      </Col>
      <Col style={{ display: "flex" }}>
        <RightContent />
      </Col>
    </Row>
  );
};

export default HeaderComp;
