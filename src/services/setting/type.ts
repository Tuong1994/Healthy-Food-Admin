import { User } from "../user/type";

export type PermissionType = "create" | "update" | "remove";

export type UserPermission = {
  id?: string;

  create: boolean;
  update: boolean;
  remove: boolean;
  userId: string;
  user?: User;

  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type UserPermissionRequest = Omit<UserPermission, "id" | "createdAt" | "updatedAt">;
