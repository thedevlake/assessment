import html2canvas from "html2canvas";

export const downloadElementAsImage = async (
  element: HTMLElement | null,
  filename = "thank-you-card.png"
) => {
  if (!element) return;
  const canvas = await html2canvas(element, {
    backgroundColor: null,
    scale: 2,
    useCORS: true,
    allowTaint: false,
    logging: false,
  });
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
};
