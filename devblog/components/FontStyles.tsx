'use client';

import { getFontFamily } from "../services/fonts.service";

export default function FontStyles(): React.ReactElement {
  return (
    <style jsx global>
      {`
        html,
        input,
        button {
          font-family: ${getFontFamily('Josefin Sans')};
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: ${getFontFamily('Lacquer')};
        }
      `}
    </style>
  )
}