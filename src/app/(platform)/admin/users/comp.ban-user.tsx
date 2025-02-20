// "use client";
// import { Button } from "@/components/ui/button";
// import React from "react";
// import { banUserAction } from "./action.ban-user";
// import { useFormState } from "react-dom";

// export const BanUserComponents = ({ userId }: { userId: string }) => {
//   const [state, formAction, pending] = useFormState(banUserAction, null);

//   console.log(state);

//   return (
//     <>
//       <form action={formAction}>
//         <input type="hidden" name="userId" value={userId} />
//         <Button variant="destructive" size="sm" disabled={pending}>
//           Ban
//         </Button>
//       </form>
//     </>
//   );
// };

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
