import http from "@utils/request";

export function getTable() {
  return http.request({ url: "/api/data", method: "GET" });
}
