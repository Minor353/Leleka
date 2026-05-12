import React from "react";

import { formatMessageDate } from "../../helpers/formatMessageTime";

import style from "./style.module.scss";

export default function Message({ isOwn, message }) {
  const formattedDate = formatMessageDate(message.createdAt);

  return (
    <div
      className={style["message"] + (isOwn ? " " + style["message--own"] : "")}
    >
      {message.type === "files" && message.files?.length > 0 && (
        <div className={style["message__files"]}>
          {message.files.map((file) => {
            const isImage = file.mimeType.startsWith("image/");

            const fileUrl = `http://localhost:5000${file.url}`;

            return isImage ? (
              <a key={file.url} href={fileUrl} download={file.name}>
                <img
                  src={fileUrl}
                  alt={file.name}
                  className={style["message__image"]}
                />
              </a>
            ) : (
              <a
                key={file.url}
                href={fileUrl}
                download={file.name}
                className={style["message__file"]}
              >
                📄 {file.name}
              </a>
            );
          })}
        </div>
      )}

      {message.text && (
        <div className={style["message__text"]}>{message.text}</div>
      )}

      <div className={style["message__time"]}>{formattedDate}</div>
    </div>
  );
}
