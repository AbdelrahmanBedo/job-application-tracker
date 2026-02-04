"use client";

import { useState } from "react"; // Removed useEffect from import
import { Board, Column, JobApplication } from "../models/models.types";
import { updateJobApplication } from "@/lib/actions/job-applications";

export function useBoard(initialBoard?: Board | null) {
  const [board, setBoard] = useState<Board | null>(initialBoard || null);
  const [columns, setColumns] = useState<Column[]>(initialBoard?.columns || []);
  const [error, setError] = useState<string | null>(null);

  // Removed the useEffect block as it was causing the ESLint warning
  // and is likely redundant for state that is also modified internally.
  // State is now initialized once from initialBoard.
  // If initialBoard needs to force re-initialization, use a 'key' prop on the consuming component.

  async function moveJob(
      jobApplicationId: string,
      newColumnId: string,
      newOrder: number
  ) {
    // Calculate the gapped order value first
    const gappedOrder = newOrder * 100;

    setColumns((prev) => {
      const newColumns = prev.map((col) => ({
        ...col,
        jobApplications: [...col.jobApplications],
      }));

      // Find and remove job from the old column
      let jobToMove: JobApplication | null = null;
      let oldColumnId: string | null = null;

      for (const col of newColumns) {
        const jobIndex = col.jobApplications.findIndex(
            (j) => j._id === jobApplicationId
        );
        if (jobIndex !== -1 && jobIndex !== undefined) {
          jobToMove = col.jobApplications[jobIndex];
          oldColumnId = col._id;
          col.jobApplications = col.jobApplications.filter(
              (job) => job._id !== jobApplicationId
          );
          break;
        }
      }

      if (jobToMove && oldColumnId) {
        const targetColumnIndex = newColumns.findIndex(
            (col) => col._id === newColumnId
        );
        if (targetColumnIndex !== -1) {
          const targetColumn = newColumns[targetColumnIndex];
          const currentJobs = targetColumn.jobApplications || [];

          const updatedJobs = [...currentJobs];
          updatedJobs.splice(newOrder, 0, {
            ...jobToMove,
            columnId: newColumnId,
            order: gappedOrder, // Use the gapped order for local state
          });

          // Re-calculate order for all jobs in the target column to ensure consistency
          const jobsWithUpdatedOrders = updatedJobs.map((job, idx) => ({
            ...job,
            order: idx * 100,
          }));

          newColumns[targetColumnIndex] = {
            ...targetColumn,
            jobApplications: jobsWithUpdatedOrders,
          };
        }
      }

      return newColumns;
    });

    try {
      // Use the same gapped order for the database update
      const result = await updateJobApplication(jobApplicationId, {
        columnId: newColumnId,
        order: gappedOrder,
      });
    } catch (err) {
      console.error("Error", err);
      // Optionally, revert state on error
    }
  }

  return { board, columns, error, moveJob };
}