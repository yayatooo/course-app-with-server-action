"use client";

import { Button } from "@/components/ui/button";
import React, { useActionState } from "react";
import { unBanUserAction } from "./action.unban-user";

export const UnBanUserComponents = ({ userId }: { userId: string }) => {
  const [_, formAction, pending] = useActionState(unBanUserAction, null);

;

  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="userId" value={userId} />
        <Button variant="default" size="sm" disabled={pending}>
          unBan
        </Button>
      </form>
    </>
  );
};
