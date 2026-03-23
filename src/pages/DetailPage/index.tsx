import React from "react";
import { ProCard } from "@ant-design/pro-components";
import {
  CopyOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  ShopOutlined,
  ShoppingOutlined,
  UserOutlined,
  CheckCircleOutlined,
  CarOutlined,
  SafetyCertificateOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Timeline, Button, message, Image, Tag, Descriptions } from "antd";
import styles from "./index.module.scss";

const orderInfo = {
  orderNo: "1000000000",
  status: "completed",
  statusText: "已完成",
  salesNo: "1234123421",
  subOrderNo: "3214321432",
  createTime: "2024-01-15 14:30:25",
  payTime: "2024-01-15 14:32:10",
};

const userInfo = {
  name: "付小小",
  phone: "18100000000",
  express: "菜鸟仓储",
  address: "浙江省杭州市西湖区万塘路18号",
  remark: "请尽快发货，谢谢！",
};

const amountInfo = {
  totalAmount: 2999.0,
  productAmount: 2899.0,
  freight: 100.0,
  discount: 0,
};

const products = [
  {
    id: 1,
    name: "Apple MacBook Air 13.3英寸笔记本电脑",
    desc: "M2芯片 | 8GB内存 | 256GB存储 | 星光色",
    price: 2899.0,
    count: 1,
    image:
      "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
  },
  {
    id: 2,
    name: "Apple Magic Mouse 2 魔术鼠标",
    desc: "无线充电 | 轻巧设计 | 多点触控",
    price: 100.0,
    count: 1,
    image:
      "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
  },
];

const timelineData = [
  {
    time: "2024-01-15 16:30:00",
    content: "订单已完成，感谢您的购买",
    operator: "系统",
    status: "success",
  },
  {
    time: "2024-01-15 15:20:00",
    content: "快递已签收，签收人：本人",
    operator: "快递员 张三",
    status: "success",
  },
  {
    time: "2024-01-15 10:00:00",
    content: "快递正在派送中",
    operator: "快递员 张三",
    status: "processing",
  },
  {
    time: "2024-01-14 18:00:00",
    content: "快递已到达杭州转运中心",
    operator: "物流系统",
    status: "default",
  },
  {
    time: "2024-01-14 08:00:00",
    content: "商品已发货，快递单号：SF1234567890",
    operator: "仓库管理员",
    status: "default",
  },
  {
    time: "2024-01-15 14:32:10",
    content: "订单支付成功",
    operator: "支付系统",
    status: "default",
  },
  {
    time: "2024-01-15 14:30:25",
    content: "订单创建成功",
    operator: "用户",
    status: "default",
  },
];

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  message.success("复制成功");
};

const getStatusTag = (status: string) => {
  const statusMap: Record<string, { text: string; className: string }> = {
    completed: { text: "已完成", className: styles.success },
    processing: { text: "处理中", className: styles.processing },
    pending: { text: "待处理", className: styles.warning },
    cancelled: { text: "已取消", className: styles.error },
  };
  const config = statusMap[status] || { text: status, className: "" };
  return (
    <span className={`${styles.statusTag} ${config.className}`}>
      <CheckCircleOutlined />
      {config.text}
    </span>
  );
};

const InfoRow: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  copyable?: boolean;
  copyText?: string;
}> = ({ icon, label, value, copyable, copyText }) => (
  <div className={styles.infoRow}>
    <div className={styles.infoLabel}>
      {icon}
      {label}
    </div>
    <div className={styles.infoValue}>
      {value}
      {copyable && (
        <CopyOutlined
          className={styles.copyBtn}
          onClick={() => copyToClipboard(copyText || String(value))}
          style={{ marginLeft: 8 }}
        />
      )}
    </div>
  </div>
);

const DetailPage: React.FC = () => {
  return (
    <div className={styles.detailPage}>
      <div className={styles.amountCard}>
        <div className={styles.amountLabel}>订单总金额</div>
        <div className={styles.amountValue}>
          <span className={styles.currency}>¥</span>
          {amountInfo.totalAmount.toFixed(2)}
        </div>
        <div className={styles.amountExtra}>
          <div className={styles.extraItem}>
            <div className={styles.extraLabel}>商品金额</div>
            <div className={styles.extraValue}>
              ¥{amountInfo.productAmount.toFixed(2)}
            </div>
          </div>
          <div className={styles.extraItem}>
            <div className={styles.extraLabel}>运费</div>
            <div className={styles.extraValue}>
              ¥{amountInfo.freight.toFixed(2)}
            </div>
          </div>
          <div className={styles.extraItem}>
            <div className={styles.extraLabel}>优惠</div>
            <div className={styles.extraValue}>
              -¥{amountInfo.discount.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      <ProCard
        className={styles.sectionCard}
        title={
          <>
            <FileTextOutlined /> 订单信息
          </>
        }
      >
        <InfoRow
          icon={<span className={styles.labelIcon}>#</span>}
          label="订单编号"
          value={orderInfo.orderNo}
          copyable
          copyText={orderInfo.orderNo}
        />
        <InfoRow
          icon={<SafetyCertificateOutlined className={styles.labelIcon} />}
          label="订单状态"
          value={getStatusTag(orderInfo.status)}
        />
        <InfoRow
          icon={<ShoppingOutlined className={styles.labelIcon} />}
          label="销售单号"
          value={orderInfo.salesNo}
          copyable
          copyText={orderInfo.salesNo}
        />
        <InfoRow
          icon={<FileTextOutlined className={styles.labelIcon} />}
          label="子订单号"
          value={orderInfo.subOrderNo}
          copyable
          copyText={orderInfo.subOrderNo}
        />
        <InfoRow
          icon={<ClockCircleOutlined className={styles.labelIcon} />}
          label="创建时间"
          value={orderInfo.createTime}
        />
        <InfoRow
          icon={<CheckCircleOutlined className={styles.labelIcon} />}
          label="支付时间"
          value={orderInfo.payTime}
        />
      </ProCard>

      <ProCard
        className={styles.sectionCard}
        title={
          <>
            <UserOutlined /> 用户信息
          </>
        }
      >
        <InfoRow
          icon={<UserOutlined className={styles.labelIcon} />}
          label="用户姓名"
          value={userInfo.name}
        />
        <InfoRow
          icon={<PhoneOutlined className={styles.labelIcon} />}
          label="联系电话"
          value={userInfo.phone}
          copyable
          copyText={userInfo.phone}
        />
        <InfoRow
          icon={<ShopOutlined className={styles.labelIcon} />}
          label="常用快递"
          value={userInfo.express}
        />
        <InfoRow
          icon={<EnvironmentOutlined className={styles.labelIcon} />}
          label="收货地址"
          value={userInfo.address}
          copyable
          copyText={userInfo.address}
        />
        <InfoRow
          icon={<FileTextOutlined className={styles.labelIcon} />}
          label="备注"
          value={userInfo.remark || "无"}
        />
      </ProCard>

      <ProCard
        className={styles.sectionCard}
        title={
          <>
            <ShoppingOutlined /> 商品信息
          </>
        }
      >
        <div className={styles.productList}>
          {products.map((product) => (
            <div key={product.id} className={styles.productItem}>
              <div className={styles.productImage}>
                <Image src={product.image} alt={product.name} preview={false} />
              </div>
              <div className={styles.productInfo}>
                <div className={styles.productName}>{product.name}</div>
                <div className={styles.productDesc}>{product.desc}</div>
              </div>
              <div className={styles.productPrice}>
                <div className={styles.priceValue}>
                  ¥{product.price.toFixed(2)}
                </div>
                <div className={styles.priceCount}>x{product.count}</div>
              </div>
            </div>
          ))}
        </div>
      </ProCard>

      <div className={styles.timelineSection}>
        <div className={styles.timelineTitle}>
          <CarOutlined /> 物流进度
        </div>
        <Timeline
          items={timelineData.map((item, index) => ({
            color: index === 0 ? "green" : "gray",
            children: (
              <div className={styles.timelineItem}>
                <div className={styles.timelineTime}>{item.time}</div>
                <div className={styles.timelineContent}>{item.content}</div>
                <div className={styles.timelineOperator}>
                  操作人：{item.operator}
                </div>
              </div>
            ),
          }))}
        />
      </div>

      <div className={styles.actionBar}>
        <Button>返回列表</Button>
        <Button type="primary">打印订单</Button>
      </div>
    </div>
  );
};

export default DetailPage;
