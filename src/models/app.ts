import { useState } from "react";

export default function useExpanded() {
  const [expanded, setExpanded] = useState<string[]>([]);
  return { expanded, setExpanded };
}
