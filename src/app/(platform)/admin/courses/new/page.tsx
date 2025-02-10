"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import React, { ChangeEvent, useActionState, useState } from "react";
import { createCourse } from "./action";

export default function page() {
  const [preview, setPreview] = useState("");
  const [state, formAction, pending] = useActionState(createCourse, null);

  // should make function first to upload preview file images
  function handleCreatePreview(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;

    const file = event.target.files[0];
    setPreview(URL.createObjectURL(file));
  }

  console.log(state);

  return (
    <main className="max-w-lg space-y-6 m-auto">
      <section>
        <h3>Create New Course</h3>
      </section>
      <section>
        <form action={formAction} className="space-y-3">
          {preview ? (
            <Image
              src={preview}
              width={800}
              height={300}
              alt="Corse Cover"
              className="rounded-lg"
            />
          ) : null}
          <div className="grid gap-2">
            <Label htmlFor="picture">Picture</Label>
            <Input
              id="picture"
              name="coverImage"
              type="file"
              onChange={handleCreatePreview}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Title</Label>
            <Input
              id="title"
              name="title"
              type="text"
              placeholder="Course Name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Description</Label>
            <Textarea placeholder="Course Description" name="description" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Price</Label>
            <Input
              id="price"
              name="price"
              placeholder="Course Prices"
              required
            />
          </div>
          <Button type="submit" disabled={pending}>
            Save Draft
          </Button>
          {state?.status === "error" && state.errors?.title ? (
            <h1 className="text-sm text-red-700">{state.errors.title}</h1>
          ) : null}
          {state?.status === "error" && state.errors?.description ? (
            <h1 className="text-sm text-red-700">{state.errors.description}</h1>
          ) : null}
          {state?.status === "error" && state.errors?.price ? (
            <h1 className="text-sm text-red-700">{state.errors.price}</h1>
          ) : null}
          {state?.status === "error" && state.errors?.coverImage ? (
            <h1 className="text-sm text-red-700">{state.errors.coverImage}</h1>
          ) : null}
        </form>
      </section>
    </main>
  );
}
