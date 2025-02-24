"use client";

import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { deleteFlashSaleAction } from "./action.delete-flash-sale";
import { FlashSale } from "@prisma/client";

interface Props {
  flashSale: Pick<FlashSale, "id">
}

export const DeleteFlashSaleComponents = ({ flashSale }: Props) => {
  const [_, formAction, pending] = useActionState(deleteFlashSaleAction, null);

  const handleSubmit = (formData: FormData) => {
    formAction(formData);
  };

  return (
    <form action={handleSubmit}>
      <input type="hidden" name="id" value={flashSale.id} />
      <Button size="sm" variant="destructive" disabled={pending}>
        {pending ? "Deleting..." : "Delete"}
      </Button>
    
    </form>
  );
};