import { api } from './api';
import { ApiResponse, Entity } from '../types/api';

export const crudService = {
  async list(resource: string, search = '', page = 1, pageSize = 10) {
    const { data } = await api.get<ApiResponse<Entity[]>>(resource, { params: { search, page, pageSize } });
    return data.data;
  },
  async create(resource: string, payload: Entity) {
    const { data } = await api.post<ApiResponse<Entity[]>>(resource, payload);
    return data.data;
  },
  async update(resource: string, id: number, payload: Entity) {
    const { data } = await api.patch<ApiResponse<Entity[]>>(`${resource}/${id}`, payload);
    return data.data;
  },
  async remove(resource: string, id: number) {
    const { data } = await api.delete<ApiResponse<Entity>>(`${resource}/${id}`);
    return data.data;
  }
};
