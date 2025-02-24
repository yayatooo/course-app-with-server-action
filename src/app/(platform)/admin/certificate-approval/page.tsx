import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { certificateService } from "@/services/certificate-service";
import { approveCertificateAction } from "./action";

export default async function page() {
  const certificates = await certificateService.getAllSertificate();

  if (!certificates || certificates.length === 0) {
    return (
      <>
        <section>
          <h1>Certificate Approval</h1>
        </section>
        <div className="text-center py-10">
          <h1 className="text-xl font-semibold text-gray-600">
            No certificates yet
          </h1>
        </div>
      </>
    );
  }

  return (
    <>
      <section>
        <h1>Certificate Approval</h1>
      </section>
      <Table>
        <TableCaption>A list of your recent certificates.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Course Name</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {certificates.map((certificate) => (
            <TableRow key={certificate.id}>
              <TableCell className="font-medium">
                {certificate.course.title}
              </TableCell>
              <TableCell>{certificate.user.name}</TableCell>
              <TableCell>{certificate.user.email}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    certificate.status === "APPROVED"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {certificate.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <form action={approveCertificateAction}>
                  <input type="hidden" name="certificateId" value={certificate.id} />
                  <Button>Approve</Button>
                </form>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
