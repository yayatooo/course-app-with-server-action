"use server";

import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";

/**
 * Updates the indices of sections within a course after a drag-and-drop operation.
 * 
 * This action is triggered when sections within a course are reordered via drag-and-drop.
 * It retrieves the current order of sections, updates the indices based on the new order,
 * and then persists these changes to the database.
 * 
 * param formData - The form data containing the courseId, sourceIndex, and destinationIndex.
 * returns - No return value. The function updates the database and revalidates the cache.
 */
export async function updateSectionIndexAction(formData: FormData) {
  // Extract the necessary data from the form data
  const courseId = formData.get("courseId") as string; // The ID of the course being updated
  const sourceIndex = Number(formData.get("sourceIndex")); // The original index of the section being moved
  const destinationIndex = Number(formData.get("destinationIndex")); // The new index of the section being moved

  // Retrieve all sections for the given course, ordered by their current index
  const allSections = await prisma.section.findMany({
    where: {
      courseId,
    },
    orderBy: {
      index: "asc",
    },
  });

  // Create a copy of the sections array to manipulate the order
  const newSections = [...allSections];
  const [movedSection] = newSections.splice(sourceIndex, 1); // Remove the section from its original position
  newSections.splice(destinationIndex, 0, movedSection); // Insert the section into its new position

  // Update the indices of all sections based on their new order
  const updatedSections = newSections.map((section, index) => ({
    ...section,
    index, // Assign the new index to each section
  }));

  // Create an array of promises to update each section's index in the database
  const updatePromises = updatedSections.map((section) => {
    return prisma.section.update({
      where: {
        id: section.id,
      },
      data: {
        index: section.index,
      },
    });
  });

  // Execute all update operations in parallel
  await Promise.all(updatePromises);

  // Revalidate the cache for the course page to reflect the changes
  revalidatePath("/admin/course/[slug]", "page");
}