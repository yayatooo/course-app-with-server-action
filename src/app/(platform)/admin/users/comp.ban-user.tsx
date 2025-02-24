"use client";
import { Button } from "@/components/ui/button";
import React, { useActionState } from "react";
import { banUserAction } from "./action.ban-user";

export const BanUserComponents = ({ userId }: { userId: string }) => {
  const [_, formAction, pending] = useActionState(banUserAction, null);

  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="userId" value={userId} />
        <Button variant="destructive" size="sm" disabled={pending}>
          Ban
        </Button>
      </form>
    </>
  );
};
