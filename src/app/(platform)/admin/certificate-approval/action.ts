"use server";

import { certificateService } from "@/services/certificate-service";
import { revalidatePath } from "next/cache";

export async function approveCertificateAction(formData: FormData) {
    const certificateId = formData.get("certificateId") as string;

    await certificateService.updateCertificate(certificateId);

    revalidatePath("/admin/certificate-approval");
}