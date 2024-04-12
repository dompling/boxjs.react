import { SyntheticEvent, useState } from "react";

export default function useExpanded() {
  const [expanded, setExpanded] = useState<string[]>([]);

  return {
    expanded,
    setExpanded,
    handleExpandedChange:
      (panel: string) => (event: SyntheticEvent, newExpanded: boolean) => {
        setExpanded((state) => {
          if (newExpanded) {
            return [...state, panel];
          }
          return state.filter((item) => item != panel);
        });
      },
  };
}
