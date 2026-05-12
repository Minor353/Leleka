import style from "./style.module.scss";

import { useRef, useState } from "react";

import { useMessages } from "../../context/MessagesContext";
import { useChat } from "../../context/ChatContext";

export default function FileUploadModal({ isOpen, onClose }) {
  const [files, setFiles] = useState([]);
  const [text, setText] = useState("");

  const inputRef = useRef(null);

  const { sendFilesMessage } = useMessages();
  const { selectedUserId } = useChat();

  if (!isOpen) {
    return null;
  }

  function handleFilesChange(e) {
    const selectedFiles = Array.from(e.target.files);

    setFiles(selectedFiles.slice(0, 10));
  }

  async function handleSend() {
    if (!files.length || !selectedUserId) {
      return;
    }

    try {
      await sendFilesMessage({
        receiverId: selectedUserId,
        text,
        files,
      });

      setFiles([]);
      setText("");

      onClose();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className={style["file-upload__overlay"]} onClick={onClose}>
      <div
        className={style["file-upload__modal"]}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={style["file-upload__title"]}>Завантаження файлів</h2>

        <button
          type="button"
          className={style["file-upload__select"]}
          onClick={() => inputRef.current?.click()}
        >
          Обрати файли
        </button>

        <input
          ref={inputRef}
          type="file"
          multiple
          hidden
          onChange={handleFilesChange}
        />

        <div className={style["file-upload__list"]}>
          {files.map((file) => {
            const isImage = file.type.startsWith("image/");

            return (
              <div key={file.name} className={style["file-upload__item"]}>
                {isImage ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className={style["file-upload__preview"]}
                  />
                ) : (
                  <div className={style["file-upload__file-icon"]}>📄</div>
                )}

                <div className={style["file-upload__meta"]}>
                  <span>{file.name}</span>

                  <button
                    type="button"
                    className={style["file-upload__remove"]}
                    onClick={() =>
                      setFiles((prev) => prev.filter((item) => item !== file))
                    }
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Підпис..."
          className={style["file-upload__textarea"]}
        />

        <button
          type="button"
          className={style["file-upload__send"]}
          onClick={handleSend}
        >
          Відправити
        </button>
      </div>
    </div>
  );
}
