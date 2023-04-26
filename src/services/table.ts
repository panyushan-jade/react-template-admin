import http from "src/utils/request";

export function getTable() {
  return http.request({ url: "/api/data", method: "GET" });
}
