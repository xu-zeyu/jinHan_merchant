"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getUser } from "../api/get-user";
import { getUserPets } from "../api/get-user-pets";
import { getUsers } from "../api/get-users";
import { updateUserStatus } from "../api/update-user-status";
import type { UserQuery, UserStatusRequest } from "../types/user.types";

const USERS_KEY = ["users"];

export function useUsers(query: UserQuery) {
  return useQuery({
    queryKey: [...USERS_KEY, "list", query],
    queryFn: () => getUsers(query),
    placeholderData: (prev) => prev,
  });
}

export function useUser(id: string | null) {
  return useQuery({
    queryKey: [...USERS_KEY, "detail", id],
    queryFn: () => getUser(id as string),
    enabled: id !== null,
  });
}

export function useUserPets(id: string | null) {
  return useQuery({
    queryKey: [...USERS_KEY, "pets", id],
    queryFn: () => getUserPets(id as string),
    enabled: id !== null,
  });
}

export function useUserStatusMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: UserStatusRequest["status"];
    }) => updateUserStatus(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_KEY });
    },
  });
}
