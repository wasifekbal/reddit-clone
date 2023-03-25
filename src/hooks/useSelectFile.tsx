import { ChangeEvent, useState } from "react";

export default function useSelectedFile(){

    const [selectedFile, setSelectedFile] = useState<string>();

    function onSelectFile(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
        }
        reader.onload = (readerEvent) => {
            if (readerEvent.target?.result) {
                setSelectedFile(readerEvent.target.result as string);
            }
        };
    }

    return {selectedFile, setSelectedFile, onSelectFile}
}
