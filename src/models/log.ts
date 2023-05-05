import { useState } from "react";

export default function useLogVisible() {
  const [visible, setVisible] = useState<boolean>();
  return { visible, setVisible };
}
