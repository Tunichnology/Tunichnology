const userName = document.getElementById("name");
const submitBtn = document.getElementById("submitBtn");


const { PDFDocument, rgb, degrees } = PDFLib;


const capitalize = (str, lower = false) =>
  (lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) =>
    match.toUpperCase()
  );

submitBtn.addEventListener("click", () => {
  const val = capitalize(userName.value);

  //check if the text is empty or not
  if (val.trim() !== "" && userName.checkValidity()) {
    // console.log(val);
    generatePDF(val);
  } else {
    userName.reportValidity();
  }
});

function sel(){

  var select = document.getElementById('listselect');
  e = select.options[select.selectedIndex].value;
  console.log(e);
  return e;
}
const generatePDF = async (name,file) => {


  switch(sel()) {
    
    case "Alg" :
      // code block
      existingPdfBytes=await fetch("./pdf/alg.pdf").then((res) =>res.arrayBuffer());
  
      break;
    
    case "C" :
      // code block
      existingPdfBytes=await fetch("./pdf/C.pdf").then((res) =>res.arrayBuffer());
  
      break;
    case "Cplusplus":
      // code block
       existingPdfBytes=await fetch("./pdf/Cplusplus.pdf").then((res) =>res.arrayBuffer());
  
      break;
    case 'Java':
      existingPdfBytes=await fetch("./pdf/Java.pdf").then((res) =>res.arrayBuffer());
      break;
    case 'Python':
      existingPdfBytes=await fetch("./pdf/python.pdf").then((res) =>res.arrayBuffer());
      break;
    case 'Arduino':
      existingPdfBytes=await fetch("./pdf/arduino.pdf").then((res) =>res.arrayBuffer());
      break;
    case 'Isis':
      existingPdfBytes=await fetch("./pdf/isis.pdf").then((res) =>res.arrayBuffer());
      break;
      
    case 'Catia':
      existingPdfBytes=await fetch("./pdf/catia.pdf").then((res) =>res.arrayBuffer());
      break;
    case 'Solidworks':
      existingPdfBytes=await fetch("./pdf/solid.pdf").then((res) =>res.arrayBuffer());
      break;
    case 'tia':
      existingPdfBytes=await fetch("./pdf/tia.pdf").then((res) =>res.arrayBuffer());
      break;
    default:
      existingPdfBytes=await fetch("./pdf/tia.pdf").then((res) =>res.arrayBuffer());

      // code block
  }
  // Load a PDFDocument from the existing PDF bytes
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(fontkit);

  //get font
  const fontBytes = await fetch("./css/Sanchez-Regular.ttf").then((res) =>
    res.arrayBuffer()
  );

  // Embed our custom font in the document
  const SanChezFont = await pdfDoc.embedFont(fontBytes);

  // Get the first page of the document
  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  // Draw a string of text diagonally across the first page
  firstPage.drawText(name, {
    x: 90,
    y: 180,
    size: 50,
    
    font: SanChezFont,
    color: rgb(0.92, 0.597, 0.29),
  });
  var current = new Date();

  firstPage.drawText(current.toLocaleDateString(), {
    x: 45,
    y: 105,
    size: 28,
    
    font: SanChezFont,
    color: rgb(0.15,0.2 ,0.2 ),
  });


  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfBytes = await pdfDoc.save();
  console.log("Done creating");

  // this was for creating uri and showing in iframe

  // const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
  // document.getElementById("pdf").src = pdfDataUri;

  var file = new File(
    [pdfBytes],
    "Certificat.pdf",
    {
      type: "application/pdf;charset=utf-8",
    }
  );
 saveAs(file);
};


// init();
