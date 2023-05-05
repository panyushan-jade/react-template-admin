import { ProCard } from "@ant-design/pro-components";
import React from "react";

const DetailPage: React.FC = () => {
  return (
    <ProCard wrap gutter={[0, 50]}>
      <ProCard colSpan={24} wrap hoverable title="退款申请">
        <ProCard colSpan={6}>取货单号：1000000000</ProCard>
        <ProCard colSpan={6}>状态：已取货</ProCard>
        <ProCard colSpan={6}>销售单号：1234123421</ProCard>
        <ProCard colSpan={6}>子订单：3214321432</ProCard>
      </ProCard>
      <ProCard colSpan={24} wrap hoverable title="用户信息">
        <ProCard colSpan={6}>用户姓名：付小小</ProCard>
        <ProCard colSpan={6}>联系电话：18100000000</ProCard>
        <ProCard colSpan={6}>常用快递：菜鸟仓储</ProCard>
        <ProCard colSpan={6}>取货地址：浙江省杭州市西湖区万塘路18号</ProCard>
        <ProCard colSpan={6}>备注：无</ProCard>
      </ProCard>
    </ProCard>
  );
};

export default DetailPage;
