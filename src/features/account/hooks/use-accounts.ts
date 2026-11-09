"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createAccount } from "../api/create-account";
import { deleteAccount } from "../api/delete-account";
import { getAccounts } from "../api/get-accounts";
import { resetAccountPassword } from "../api/reset-account-password";
import { updateAccount } from "../api/update-account";
import { updateAccountStatus } from "../api/update-account-status";
import type {
  AccountQuery,
  CreateAccountRequest,
  ResetPasswordRequest,
  UpdateAccountRequest,
} from "../types/account.types";

const ACCOUNTS_KEY = ["accounts"];

export function useAccounts(query: AccountQuery) {
  return useQuery({
    queryKey: [...ACCOUNTS_KEY, "list", query],
    queryFn: () => getAccounts(query),
    placeholderData: (prev) => prev,
  });
}

export function useAccountMutations() {
  const queryClient = useQueryClient();
  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ACCOUNTS_KEY });

  const createMutation = useMutation({
    mutationFn: (payload: CreateAccountRequest) => createAccount(payload),
    onSuccess: invalidate,
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: UpdateAccountRequest;
    }) => updateAccount(id, payload),
    onSuccess: invalidate,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteAccount(id),
    onSuccess: invalidate,
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, enabled }: { id: number; enabled: boolean }) =>
      updateAccountStatus(id, { enabled }),
    onSuccess: invalidate,
  });

  const resetPasswordMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: ResetPasswordRequest }) =>
      resetAccountPassword(id, payload),
    onSuccess: invalidate,
  });

  return {
    createMutation,
    updateMutation,
    deleteMutation,
    statusMutation,
    resetPasswordMutation,
  };
}
