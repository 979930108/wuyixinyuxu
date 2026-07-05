import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

export async function exportResumeToPdf(
  element: HTMLElement,
  filename: string
): Promise<void> {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: "#ffffff",
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const imgWidth = A4_WIDTH_MM;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  // 内容不足一页：只输出一页，高度随内容
  if (imgHeight <= A4_HEIGHT_MM) {
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save(filename);
    return;
  }

  // 内容超过一页：按页切片，避免空白页
  let offsetY = 0;
  let pageIndex = 0;

  while (offsetY < imgHeight - 0.5) {
    if (pageIndex > 0) {
      pdf.addPage();
    }
    pdf.addImage(imgData, "PNG", 0, -offsetY, imgWidth, imgHeight);
    offsetY += A4_HEIGHT_MM;
    pageIndex++;
  }

  pdf.save(filename);
}
