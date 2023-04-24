import React from "react";

const Dashboard: React.FC = () => {
  return <div>我是工作台~</div>;
};

export async function action() {
  throw new Error("oh dang!");
}

export default Dashboard;
