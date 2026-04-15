import { faker } from '@faker-js/faker'

export interface TableItem {
  id: string
  number: number
  title: string
  labels: {
    name: string
    color: string
  }[]
  state: string
  created_at: string
  updated_at: string
}

export interface TableParams {
  page?: number
  pageSize?: number
  keyword?: string
  state?: string
  startTime?: string
  endTime?: string
}

export async function getTable(params?: TableParams) {
  const page = params?.page || 1
  const pageSize = params?.pageSize || 10

  const data = new Array(pageSize).fill(null).map(() => ({
    id: faker.string.uuid(),
    number: faker.number.int(),
    title: faker.commerce.productName(),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.recent().toISOString(),
    state: faker.helpers.arrayElement(['open', 'closed', 'processing']),
    labels: new Array(faker.helpers.arrayElement([1, 2]))
      .fill(null)
      .map(() => ({
        name: faker.commerce.productAdjective(),
        color: faker.color.rgb(),
      })),
  }))

  return {
    code: 200,
    message: 'success',
    data: {
      list: data,
      total: 100,
      page,
      pageSize,
    },
  }
}

export async function addTable(data: Partial<TableItem>) {
  return new Promise<Api.Response<TableItem>>((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        message: '添加成功',
        data: {
          id: faker.string.uuid(),
          number: faker.number.int(),
          title: data.title || '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          state: 'open',
          labels: [],
        },
      })
    }, 500)
  })
}

export async function updateTable(id: string, data: Partial<TableItem>) {
  return new Promise<Api.Response<TableItem>>((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        message: '更新成功',
        data: {
          id,
          number: faker.number.int(),
          title: data.title || '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          state: data.state || 'open',
          labels: [],
        },
      })
    }, 500)
  })
}

export async function deleteTable(id: string) {
  return new Promise<Api.Response<null>>((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        message: '删除成功',
        data: null,
      })
    }, 500)
  })
}
