import { ReactElement, useState } from "react";

export default function Component() : ReactElement{
  const [text, setText] = useState("Ts" as string);

  return <>Hey!{text}</>;
}
