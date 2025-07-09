"use client";

import { Suspense } from "react";
import { TrainPageContent } from "../components/taskPage";
// вынеси всю логику сюда

export default function Page() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <TrainPageContent />
    </Suspense>
  );
}
