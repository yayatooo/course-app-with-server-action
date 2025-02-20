import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { userServices } from "@/services/user-services";
import React from "react";
import { BanUserComponents } from "./comp.ban-user";
import { UnBanUserComponents } from "./comp.unban-user";

export default async function page() {
  const users = await userServices.getAllUsers();

  return (
    <main>
      <section>User</section>
      <section>
        <Table>
          <TableCaption>A list of current user.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Enroll Courses</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>0</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell className="text-right">
                  {user.onBanned ? (
                    <UnBanUserComponents userId={user.id} />
                  ) : (
                    <BanUserComponents userId={user.id} />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter> */}
        </Table>
      </section>
    </main>
  );
}
